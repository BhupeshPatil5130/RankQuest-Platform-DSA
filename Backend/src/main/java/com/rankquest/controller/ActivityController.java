package com.rankquest.controller;

import com.rankquest.dto.ActivityResponse;
import com.rankquest.dto.ApiResponse;
import com.rankquest.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for activity tracking and heatmap data.
 * Extracts email from SecurityContextHolder if query parameter is omitted.
 */
@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    private String resolveEmail(String paramEmail) {
        if (paramEmail != null && !paramEmail.trim().isEmpty()) {
            return paramEmail.trim();
        }
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/heatmap")
    public ResponseEntity<ApiResponse<ActivityResponse>> getActivityHeatmap(@RequestParam(required = false) String email) {
        String targetEmail = resolveEmail(email);
        ActivityResponse data = activityService.getActivityData(targetEmail);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
