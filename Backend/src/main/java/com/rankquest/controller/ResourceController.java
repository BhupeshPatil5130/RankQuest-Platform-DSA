package com.rankquest.controller;

import com.rankquest.model.Resource;
import com.rankquest.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for learning resources endpoints.
 * Publicly accessible (no authentication required).
 */
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public ResponseEntity<List<Resource>> getAllResources(
            @RequestParam(required = false, defaultValue = "all") String category
    ) {
        return ResponseEntity.ok(resourceService.getResourcesByCategory(category));
    }
}
