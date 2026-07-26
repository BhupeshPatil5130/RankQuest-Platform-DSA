package com.rankquest.repository;

import com.rankquest.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {

    // For heatmap: get activity within a date range
    List<ActivityLog> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);

    // For streak calculation: get all activity ordered by date
    List<ActivityLog> findByUserIdOrderByDateDesc(Long userId);

    // Find a specific day's activity
    Optional<ActivityLog> findByUserIdAndDate(Long userId, LocalDate date);
}
