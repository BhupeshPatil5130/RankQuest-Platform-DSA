package com.rankquest.service;

import com.rankquest.dto.RankingEntry;
import com.rankquest.model.User;
import com.rankquest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Service layer for leaderboard/ranking operations.
 */
@Service
@Transactional(readOnly = true)
public class RankingService {

    private final UserRepository userRepository;

    public RankingService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get global rankings sorted by total problems solved descending.
     */
    public List<RankingEntry> getGlobalRankings() {
        List<User> users = userRepository.findAllByOrderByTotalSolvedDesc();
        return toRankingList(users);
    }

    /**
     * Get college-specific rankings sorted by total problems solved descending.
     */
    public List<RankingEntry> getCollegeRankings(String college) {
        List<User> users = userRepository.findByCollegeOrderByTotalSolvedDesc(college);
        return toRankingList(users);
    }

    /**
     * Convert user list to ranking entries with rank numbers (1-indexed).
     */
    private List<RankingEntry> toRankingList(List<User> users) {
        List<RankingEntry> rankings = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            User u = users.get(i);
            rankings.add(new RankingEntry(
                i + 1,
                u.getUsername(),
                u.getEmail(),
                u.getCollege() != null ? u.getCollege() : "",
                u.getTotalSolved(),
                u.getCurrentStreak(),
                u.getMaxStreak()
            ));
        }
        return rankings;
    }
}
