package com.rankquest.service;

import com.rankquest.model.Pattern;
import com.rankquest.model.Problem;
import com.rankquest.repository.PatternRepository;
import com.rankquest.repository.ProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatternService {

    private final PatternRepository patternRepository;
    private final ProblemRepository problemRepository;

    public List<Pattern> getAllPatternsInSequence() {
        return patternRepository.findAllByOrderBySequenceOrderAsc();
    }

    public Pattern getPatternBySlug(String slug) {
        return patternRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Pattern not found with slug: " + slug));
    }

    public List<Problem> getProblemsByPattern(String slug) {
        return problemRepository.findByPatternSlug(slug);
    }
}
