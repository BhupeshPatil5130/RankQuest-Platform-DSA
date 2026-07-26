package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a sequential DSA algorithmic pattern (e.g., Two Pointers, Sliding Window).
 * Patterns are ordered from beginner to advanced to form a structured learning roadmap.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "patterns")
public class Pattern {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug; // URL-friendly identifier, e.g., "two-pointers"

    @Column(nullable = false)
    private int sequenceOrder; // 1, 2, 3... for beginner-to-advanced roadmap order

    @Column(nullable = false)
    private String name; // e.g., "Two Pointers"

    @Column(nullable = false)
    private String category; // Beginner Foundations, Intermediate Techniques, Advanced Algorithmic Mastery

    @Column(nullable = false)
    private String difficulty; // Easy, Medium, Hard, Beginner-Friendly

    @Column(columnDefinition = "TEXT")
    private String description; // Comprehensive overview of when and how to use the pattern

    @Column(columnDefinition = "TEXT")
    private String keyStrategy; // Key pointers, formula, or code template approach

    @Column(nullable = false)
    private int totalProblems; // Number of curated problems (typically 10)

    private String icon; // Icon name for frontend rendering

    private String colorFrom; // Tailwind gradient start

    private String colorTo; // Tailwind gradient end

    public Pattern(String slug, int sequenceOrder, String name, String category,
                   String difficulty, String description, String keyStrategy,
                   int totalProblems, String icon, String colorFrom, String colorTo) {
        this.slug = slug;
        this.sequenceOrder = sequenceOrder;
        this.name = name;
        this.category = category;
        this.difficulty = difficulty;
        this.description = description;
        this.keyStrategy = keyStrategy;
        this.totalProblems = totalProblems;
        this.icon = icon;
        this.colorFrom = colorFrom;
        this.colorTo = colorTo;
    }
}
