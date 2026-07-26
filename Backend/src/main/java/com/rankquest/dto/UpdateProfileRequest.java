package com.rankquest.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String college;
    private String branch;
    private String year;
    private String rollNumber;
    private String bio;
    private String username;
}
