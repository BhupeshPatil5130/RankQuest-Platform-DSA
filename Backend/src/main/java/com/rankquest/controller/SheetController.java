package com.rankquest.controller;

import com.rankquest.model.Problem;
import com.rankquest.model.Sheet;
import com.rankquest.service.SheetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for sheet and problem browsing.
 * All endpoints are public (no auth required).
 */
@RestController
@RequestMapping("/api")
public class SheetController {

    private final SheetService sheetService;

    public SheetController(SheetService sheetService) {
        this.sheetService = sheetService;
    }

    // ── Sheet Endpoints ──────────────────────────────

    @GetMapping("/sheets")
    public ResponseEntity<List<Sheet>> getAllSheets() {
        return ResponseEntity.ok(sheetService.getAllSheets());
    }

    @GetMapping("/sheets/{slug}")
    public ResponseEntity<Sheet> getSheetBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(sheetService.getSheetBySlug(slug));
    }

    @GetMapping("/sheets/{slug}/problems")
    public ResponseEntity<List<Problem>> getProblemsBySheet(@PathVariable String slug) {
        return ResponseEntity.ok(sheetService.getProblemsBySheet(slug));
    }
}
