package com.rankquest.repository;

import com.rankquest.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByUserId(Long userId);

    Optional<Submission> findByUserIdAndProblemId(Long userId, Long problemId);

    boolean existsByUserIdAndProblemId(Long userId, Long problemId);

    // Return only ACCEPTED problem IDs for a user (for solved tracking)
    @Query("SELECT DISTINCT s.problemId FROM Submission s WHERE s.userId = :userId AND s.status = com.rankquest.model.Submission.Status.ACCEPTED")
    List<Long> findSolvedProblemIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(DISTINCT s.problemId) FROM Submission s WHERE s.userId = :userId AND s.status = com.rankquest.model.Submission.Status.ACCEPTED")
    long countDistinctSolvedByUserId(@Param("userId") Long userId);

    List<Submission> findByUserIdAndStatus(Long userId, Submission.Status status);
}
