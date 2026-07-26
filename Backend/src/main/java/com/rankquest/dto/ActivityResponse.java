package com.rankquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityResponse {
    private int currentStreak;
    private int maxStreak;
    private int totalActiveDays;
    private Map<String, Integer> heatmapData; // "YYYY-MM-DD" -> count
}
