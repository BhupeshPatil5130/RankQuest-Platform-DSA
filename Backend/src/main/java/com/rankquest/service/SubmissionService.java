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
 * updates activity logs, and manages streak calculations cleanly.
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
     * Submit or toggle a solution for a problem.
     * Safely handles ACCEPTED and UNSOLVED statuses without duplicate key errors.
     */
    @Transactional
    public ApiResponse<String> submitSolution(Long problemId, String email, SubmissionRequest request) {
        User user = userService.findByEmail(email);
        String requestedStatus = request != null && request.getStatus() != null ? request.getStatus() : "ACCEPTED";

        Optional<Submission> existing = submissionRepository.findByUserIdAndProblemId(user.getId(), problemId);

        // If user is requesting to unmark/unsolve the problem
        if ("UNSOLVED".equalsIgnoreCase(requestedStatus)) {
            if (existing.isPresent()) {
                submissionRepository.delete(existing.get());
                user.setTotalSolved((int) submissionRepository.countDistinctSolvedByUserId(user.getId()));

                // Decrement or remove today's activity log entry
                LocalDate today = LocalDate.now();
                Optional<ActivityLog> todayLog = activityLogRepository.findByUserIdAndDate(user.getId(), today);
                if (todayLog.isPresent()) {
                    ActivityLog log = todayLog.get();
                    if (log.getProblemsSolved() > 1) {
                        log.setProblemsSolved(log.getProblemsSolved() - 1);
                        activityLogRepository.save(log);
                    } else {
                        activityLogRepository.delete(log);
                    }
                }

                userRepository.save(user);
                return ApiResponse.success("Problem unmarked as solved");
            }
            return ApiResponse.success("Already unsolved");
        }

        // If submission record already exists for this (user, problem) pair
        if (existing.isPresent()) {
            Submission s = existing.get();
            s.setStatus(Submission.Status.ACCEPTED);
            if (request != null && request.getLanguage() != null) {
                s.setLanguage(request.getLanguage());
            }
            submissionRepository.save(s);
            updateStreakAndActivity(user);
            user.setTotalSolved((int) submissionRepository.countDistinctSolvedByUserId(user.getId()));
            userRepository.save(user);
            return ApiResponse.success("Submission updated!");
        }

        // Create new submission record safely
        Submission submission = new Submission(
                user.getId(),
                problemId,
                (request != null && request.getLanguage() != null) ? request.getLanguage() : "java",
                Submission.Status.ACCEPTED
        );
        submissionRepository.save(submission);

        // Update user stats for new solve
        updateStreakAndActivity(user);
        user.setTotalSolved((int) submissionRepository.countDistinctSolvedByUserId(user.getId()));
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
        if (lastSolved == null) {
            user.setCurrentStreak(1);
        } else if (lastSolved.equals(today.minusDays(1))) {
            user.setCurrentStreak(user.getCurrentStreak() + 1);
        } else if (lastSolved.isBefore(today.minusDays(1))) {
            user.setCurrentStreak(1);
        } else if (lastSolved.equals(today) && user.getCurrentStreak() == 0) {
            user.setCurrentStreak(1);
        }

        user.setMaxStreak(Math.max(user.getMaxStreak(), user.getCurrentStreak()));
        user.setLastSolvedDate(today);
    }
}
