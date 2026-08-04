package com.rankquest.controller;

import com.rankquest.dto.ApiResponse;
import com.rankquest.model.Pattern;
import com.rankquest.model.Problem;
import com.rankquest.service.PatternService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patterns")
@RequiredArgsConstructor
public class PatternController {

    private final PatternService patternService;

    @GetMapping
    public ResponseEntity<List<Pattern>> getAllPatterns() {
        return ResponseEntity.ok(patternService.getAllPatternsInSequence());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Pattern> getPatternBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(patternService.getPatternBySlug(slug));
    }

    @GetMapping("/{slug}/problems")
    public ResponseEntity<List<Problem>> getProblemsByPattern(@PathVariable String slug) {
        return ResponseEntity.ok(patternService.getProblemsByPattern(slug));
    }
}
