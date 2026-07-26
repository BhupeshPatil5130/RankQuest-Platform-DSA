package com.rankquest.service;

import com.rankquest.dto.ActivityResponse;
import com.rankquest.model.ActivityLog;
import com.rankquest.model.User;
import com.rankquest.repository.ActivityLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service layer for activity tracking and heatmap data.
 * Provides data for the GitHub-style contribution graph.
 */
@Service
@Transactional(readOnly = true)
public class ActivityService {

    private final ActivityLogRepository activityLogRepository;
    private final UserService userService;

    public ActivityService(ActivityLogRepository activityLogRepository, UserService userService) {
        this.activityLogRepository = activityLogRepository;
        this.userService = userService;
    }

    /**
     * Get full activity data including heatmap and streak info.
     * Returns 365 days of activity data for the contribution graph.
     */
    public ActivityResponse getActivityData(String email) {
        User user = userService.findByEmail(email);
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(365);

        // Get activity logs for the past year
        List<ActivityLog> logs = activityLogRepository.findByUserIdAndDateBetween(user.getId(), start, end);

        // Build heatmap data: "YYYY-MM-DD" -> problemsSolved count
        Map<String, Integer> heatmapData = new HashMap<>();
        int totalActiveDays = 0;

        for (ActivityLog log : logs) {
            if (log.getProblemsSolved() > 0) {
                heatmapData.put(log.getDate().toString(), log.getProblemsSolved());
                totalActiveDays++;
            }
        }

        return new ActivityResponse(
            user.getCurrentStreak(),
            user.getMaxStreak(),
            totalActiveDays,
            heatmapData
        );
    }
}
