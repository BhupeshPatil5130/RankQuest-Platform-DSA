package com.rankquest.repository;

import com.rankquest.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {

    List<Problem> findBySheetSlug(String sheetSlug);

    List<Problem> findBySheetSlugAndDifficulty(String sheetSlug, String difficulty);

    List<Problem> findBySheetSlugAndTopic(String sheetSlug, String topic);

    long countBySheetSlug(String sheetSlug);
}