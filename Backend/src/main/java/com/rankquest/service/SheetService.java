package com.rankquest.service;

import com.rankquest.exception.ResourceNotFoundException;
import com.rankquest.model.Problem;
import com.rankquest.model.Sheet;
import com.rankquest.repository.ProblemRepository;
import com.rankquest.repository.SheetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SheetService {

    private final SheetRepository sheetRepository;
    private final ProblemRepository problemRepository;

    public SheetService(SheetRepository sheetRepository, ProblemRepository problemRepository) {
        this.sheetRepository = sheetRepository;
        this.problemRepository = problemRepository;
    }

    public List<Sheet> getAllSheets() {
        return sheetRepository.findAll();
    }

    public Sheet getSheetBySlug(String slug) {
        return sheetRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Sheet not found: " + slug));
    }

    public List<Problem> getProblemsBySheet(String sheetSlug) {
        return problemRepository.findBySheetSlug(sheetSlug);
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Problem not found with id: " + id));
    }
}
