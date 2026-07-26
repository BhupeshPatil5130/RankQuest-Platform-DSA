package com.rankquest.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a single DSA problem belonging to one or more sheets.
 * Contains all metadata needed for display and tracking.
 */
@Data
@Entity
@NoArgsConstructor
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String difficulty; // Easy, Medium, Hard

    private String acceptance;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String topic; // Arrays, Strings, Trees, DP, etc.

    @Column(nullable = false)
    private String sheetSlug; // FK reference to Sheet.slug

    private String leetcodeUrl;

    private String gfgUrl;

    private String youtubeUrl;

    private String companies; // Comma-separated: "Google,Amazon,Meta"

    private String tags; // Comma-separated: "Hash Table,Array,Sorting"

    public Problem(String title, String description, String difficulty, String acceptance,
                   String topic, String sheetSlug, String leetcodeUrl, String gfgUrl,
                   String companies, String tags) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.acceptance = acceptance;
        this.topic = topic;
        this.sheetSlug = sheetSlug;
        this.leetcodeUrl = leetcodeUrl;
        this.gfgUrl = gfgUrl;
        this.companies = companies;
        this.tags = tags;
    }
}