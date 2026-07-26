package com.rankquest.controller;

import com.rankquest.dto.ApiResponse;
import com.rankquest.dto.SubmissionRequest;
import com.rankquest.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for problem submission operations.
 * Extracts email from SecurityContextHolder if query parameter is omitted.
 */
@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    private String resolveEmail(String paramEmail) {
        if (paramEmail != null && !paramEmail.trim().isEmpty()) {
            return paramEmail.trim();
        }
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/{problemId}")
    public ResponseEntity<ApiResponse<String>> submitSolution(
            @PathVariable Long problemId,
            @RequestParam(required = false) String email,
            @RequestBody SubmissionRequest request
    ) {
        String targetEmail = resolveEmail(email);
        ApiResponse<String> response = submissionService.submitSolution(problemId, targetEmail, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-solved")
    public ResponseEntity<List<Long>> getMySolvedProblems(@RequestParam(required = false) String email) {
        String targetEmail = resolveEmail(email);
        List<Long> solvedIds = submissionService.getSolvedProblemIds(targetEmail);
        return ResponseEntity.ok(solvedIds);
    }
}
