package com.rankquest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Health check controller for container deployment monitoring (Render, K8s, AWS, GCP).
 * Provides lightweight status checks on /api/health, /health, and root /.
 */
@RestController
public class HealthController {

    @GetMapping({"/api/health", "/health", "/"})
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "RankQuest-Platform-DSA-Backend",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
