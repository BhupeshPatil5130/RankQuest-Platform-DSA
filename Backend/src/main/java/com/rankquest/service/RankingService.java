package com.rankquest.service;

import com.rankquest.dto.RankingEntry;
import com.rankquest.model.User;
import com.rankquest.repository.SubmissionRepository;
import com.rankquest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service layer for leaderboard/ranking operations.
 */
@Service
@Transactional
public class RankingService {

    private final UserRepository userRepository;
    private final SubmissionRepository submissionRepository;

    public RankingService(UserRepository userRepository, SubmissionRepository submissionRepository) {
        this.userRepository = userRepository;
        this.submissionRepository = submissionRepository;
    }

    /**
     * Get global rankings sorted by total problems solved descending.
     */
    public List<RankingEntry> getGlobalRankings() {
        syncAllUserSolvedCounts();
        List<User> users = userRepository.findAllByOrderByTotalSolvedDesc();
        return toRankingList(users);
    }

    /**
     * Get college-specific rankings sorted by total problems solved descending.
     */
    public List<RankingEntry> getCollegeRankings(String college) {
        syncAllUserSolvedCounts();
        List<User> users = userRepository.findByCollegeOrderByTotalSolvedDesc(college);
        return toRankingList(users);
    }

    /**
     * Synchronize totalSolved count for all users with actual ACCEPTED submissions in DB.
     */
    private void syncAllUserSolvedCounts() {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            int actualSolved = (int) submissionRepository.countDistinctSolvedByUserId(u.getId());
            if (u.getTotalSolved() != actualSolved) {
                u.setTotalSolved(actualSolved);
                userRepository.save(u);
            }
        }
    }

    /**
     * Convert user list to ranking entries with rank numbers (1-indexed).
     */
    private List<RankingEntry> toRankingList(List<User> users) {
        List<RankingEntry> rankings = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            User u = users.get(i);
            int solved = u.getTotalSolved();
            int streak = u.getCurrentStreak();
            String name = (u.getFullName() != null && !u.getFullName().trim().isEmpty()) ? u.getFullName() : u.getUsername();

            rankings.add(new RankingEntry(
                i + 1,
                u.getUsername(),
                name,
                u.getEmail(),
                u.getCollege() != null ? u.getCollege() : "",
                solved,          // totalSolved
                solved,          // problemsSolved
                streak,          // currentStreak
                streak,          // streakDays
                u.getMaxStreak(),
                solved * 10      // points
            ));
        }
        return rankings;
    }
}
