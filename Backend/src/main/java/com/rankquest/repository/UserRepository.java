package com.rankquest.repository;

import com.rankquest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    // Rankings: global sorted by problems solved descending
    List<User> findAllByOrderByTotalSolvedDesc();

    // Rankings: college-specific sorted by problems solved descending
    List<User> findByCollegeOrderByTotalSolvedDesc(String college);
}