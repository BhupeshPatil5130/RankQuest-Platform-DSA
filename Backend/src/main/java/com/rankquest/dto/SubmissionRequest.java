package com.rankquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionRequest {
    private String language;
    private String code;
    private String status; // e.g. "ACCEPTED", "UNSOLVED", "PENDING"
}
