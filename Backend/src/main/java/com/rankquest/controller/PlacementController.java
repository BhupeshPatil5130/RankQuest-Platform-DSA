package com.rankquest.controller;

import com.rankquest.dto.PlacementTopicResponse;
import com.rankquest.service.PlacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST Controller serving placement sheet topics and questions dynamically from backend API.
 * Public endpoint (no auth required for browsing).
 */
@RestController
@RequestMapping("/api/placement")
public class PlacementController {

    private final PlacementService placementService;

    public PlacementController(PlacementService placementService) {
        this.placementService = placementService;
    }

    @GetMapping("/topics")
    public ResponseEntity<List<PlacementTopicResponse>> getPlacementTopics() {
        return ResponseEntity.ok(placementService.getPlacementTopics());
    }
}
