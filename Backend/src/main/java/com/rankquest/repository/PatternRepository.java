package com.rankquest.repository;

import com.rankquest.model.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatternRepository extends JpaRepository<Pattern, Long> {

    List<Pattern> findAllByOrderBySequenceOrderAsc();

    Optional<Pattern> findBySlug(String slug);
}
