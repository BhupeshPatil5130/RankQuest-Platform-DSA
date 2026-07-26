package com.rankquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RankingEntry {
    private int rank;
    private String username;
    private String email;
    private String college;
    private int totalSolved;
    private int currentStreak;
    private int maxStreak;
}
