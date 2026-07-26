package com.rankquest.controller;

import com.rankquest.model.Problem;
import com.rankquest.service.SheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for problem browsing.
 * All endpoints are public (no auth required).
 */
@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final SheetService sheetService;

    public ProblemController(SheetService sheetService) {
        this.sheetService = sheetService;
    }

    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(sheetService.getAllProblems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long id) {
        return ResponseEntity.ok(sheetService.getProblemById(id));
    }
}