package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Profile fields
    private String fullName;
    private String college;
    private String branch;
    @Column(name = "study_year")
    private String year;

    private String rollNumber;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // Streak & stats fields
    @Column(nullable = false)
    private int currentStreak = 0;

    @Column(nullable = false)
    private int maxStreak = 0;

    @Column(nullable = false)
    private int totalSolved = 0;

    private LocalDate lastSolvedDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }
}