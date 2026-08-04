package com.rankquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object for Placement Module Topics served via Backend API.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlacementTopicResponse {
    private String id;
    private String name;
    private String icon;
    private String description;
    private List<PlacementProblemDto> easy;
    private List<PlacementProblemDto> medium;
    private List<PlacementProblemDto> hard;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlacementProblemDto {
        private Long id;
        private String title;
        private String leetcodeUrl;
        private String gfgUrl;
        private String youtubeUrl;
        private List<String> companies;
        private List<String> tags;
        private String acceptance;
    }
}
