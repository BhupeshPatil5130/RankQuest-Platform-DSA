package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a curated DSA problem sheet (e.g., Striver SDE Sheet, Blind 75).
 * Sheets contain multiple problems and are the primary organizational unit.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "sheets")
public class Sheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String slug; // URL-friendly identifier, e.g., "striver-sde"

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String author;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int totalProblems;

    private String difficulty; // Easy, Medium, Hard, Mixed

    private String category; // Interview Prep, Complete DSA, FAANG Prep, etc.

    private double rating;

    private String estimatedTime; // e.g., "3-4 months"

    private String icon; // icon name for frontend

    private String colorFrom; // gradient start, e.g., "blue-600"

    private String colorTo; // gradient end, e.g., "indigo-600"

    public Sheet(String slug, String name, String author, String description,
                 int totalProblems, String difficulty, String category,
                 double rating, String estimatedTime, String icon,
                 String colorFrom, String colorTo) {
        this.slug = slug;
        this.name = name;
        this.author = author;
        this.description = description;
        this.totalProblems = totalProblems;
        this.difficulty = difficulty;
        this.category = category;
        this.rating = rating;
        this.estimatedTime = estimatedTime;
        this.icon = icon;
        this.colorFrom = colorFrom;
        this.colorTo = colorTo;
    }
}
