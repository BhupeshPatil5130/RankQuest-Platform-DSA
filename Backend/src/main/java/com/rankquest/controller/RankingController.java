package com.rankquest.controller;

import com.rankquest.dto.RankingEntry;
import com.rankquest.service.RankingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for leaderboard/ranking operations.
 */
@RestController
@RequestMapping("/api/rankings")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/global")
    public ResponseEntity<List<RankingEntry>> getGlobalRankings() {
        return ResponseEntity.ok(rankingService.getGlobalRankings());
    }

    @GetMapping("/college")
    public ResponseEntity<List<RankingEntry>> getCollegeRankings(@RequestParam String college) {
        return ResponseEntity.ok(rankingService.getCollegeRankings(college));
    }
}
