package com.rankquest.service;

import com.rankquest.dto.ApiResponse;
import com.rankquest.dto.SubmissionRequest;
import com.rankquest.model.ActivityLog;
import com.rankquest.model.Submission;
import com.rankquest.model.User;
import com.rankquest.repository.ActivityLogRepository;
import com.rankquest.repository.SubmissionRepository;
import com.rankquest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for problem submissions.
 * Handles solution submissions, tracks solved problems,
 * updates activity logs, and manages streak calculations.
 */
@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;
    private final UserService userService;

    public SubmissionService(
            SubmissionRepository submissionRepository,
            UserRepository userRepository,
            ActivityLogRepository activityLogRepository,
            UserService userService
    ) {
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
        this.userService = userService;
    }

    /**
     * Submit a solution for a problem.
     * All submissions are marked ACCEPTED (no real code execution engine).
     * Updates user stats, activity logs, and streaks atomically.
     * If already solved, returns a message without re-counting stats.
     */
    @Transactional
    public ApiResponse<String> submitSolution(Long problemId, String email, SubmissionRequest request) {
        User user = userService.findByEmail(email);

        // Check if already solved
        boolean alreadySolved = submissionRepository.existsByUserIdAndProblemId(user.getId(), problemId);

        if (alreadySolved) {
            // Update existing submission's language only
            Optional<Submission> existing = submissionRepository.findByUserIdAndProblemId(user.getId(), problemId);
            existing.ifPresent(s -> {
                s.setLanguage(request.getLanguage() != null ? request.getLanguage() : s.getLanguage());
                submissionRepository.save(s);
            });
            return ApiResponse.success("Already solved — submission updated!");
        }

        // Create new submission record
        Submission submission = new Submission(
                user.getId(),
                problemId,
                request.getLanguage() != null ? request.getLanguage() : "java",
                Submission.Status.ACCEPTED
        );
        submissionRepository.save(submission);

        // Update user stats for new solve
        user.setTotalSolved(user.getTotalSolved() + 1);
        updateStreakAndActivity(user);
        userRepository.save(user);

        return ApiResponse.success("Problem solved! 🎉 Keep going!");
    }

    /**
     * Get list of solved problem IDs for a user (ACCEPTED submissions only).
     */
    @Transactional(readOnly = true)
    public List<Long> getSolvedProblemIds(String email) {
        User user = userService.findByEmail(email);
        return submissionRepository.findSolvedProblemIdsByUserId(user.getId());
    }

    /**
     * Update the user's streak and daily activity log.
     * Called only on first solve of a problem.
     */
    private void updateStreakAndActivity(User user) {
        LocalDate today = LocalDate.now();

        // Update or create today's activity log
        Optional<ActivityLog> todayLog = activityLogRepository.findByUserIdAndDate(user.getId(), today);
        if (todayLog.isPresent()) {
            ActivityLog log = todayLog.get();
            log.setProblemsSolved(log.getProblemsSolved() + 1);
            activityLogRepository.save(log);
        } else {
            activityLogRepository.save(new ActivityLog(user.getId(), today, 1));
        }

        // Calculate streak
        LocalDate lastSolved = user.getLastSolvedDate();
        if (lastSolved == null || lastSolved.isBefore(today.minusDays(1))) {
            // Streak broken or first solve — reset to 1
            user.setCurrentStreak(1);
        } else if (lastSolved.equals(today.minusDays(1))) {
            // Consecutive day — increment streak
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        }
        // If lastSolved is today (multiple problems in same day), streak stays the same

        user.setLastSolvedDate(today);

        // Update max streak if current is higher
        if (user.getCurrentStreak() > user.getMaxStreak()) {
            user.setMaxStreak(user.getCurrentStreak());
        }
    }
}
