package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a curated learning resource (book, video, course, article, etc.).
 */
@Data
@Entity
@NoArgsConstructor
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String type; // book, video, article, course, repository

    @Column(nullable = false)
    private String category; // algorithms, course, patterns, interview, system-design, fundamentals, competitive

    @Column(columnDefinition = "TEXT")
    private String description;

    private String author;

    private double rating;

    private int usersCount;

    private String url;

    private String difficulty; // Beginner, Intermediate, Advanced, All Levels

    private String topics; // Comma-separated topics

    public Resource(String title, String type, String category, String description,
                    String author, double rating, int usersCount, String url,
                    String difficulty, String topics) {
        this.title = title;
        this.type = type;
        this.category = category;
        this.description = description;
        this.author = author;
        this.rating = rating;
        this.usersCount = usersCount;
        this.url = url;
        this.difficulty = difficulty;
        this.topics = topics;
    }
}
