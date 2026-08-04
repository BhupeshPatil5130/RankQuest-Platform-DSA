package com.rankquest.dto;

import com.rankquest.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User profile data exposed to the frontend.
 * Never includes the password hash.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String college;
    private String branch;
    private String year;
    private String rollNumber;
    private String bio;
    private String role;
    private int currentStreak;
    private int streakDays; // Alias for frontend streakDays
    private int maxStreak;
    private int totalSolved;

    /**
     * Factory method to convert a User entity to a safe profile response.
     */
    public static UserProfileResponse fromUser(User user) {
        return new UserProfileResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getFullName(),
            user.getCollege(),
            user.getBranch(),
            user.getYear(),
            user.getRollNumber(),
            user.getBio(),
            user.getRole().name(),
            user.getCurrentStreak(),
            user.getCurrentStreak(), // streakDays
            user.getMaxStreak(),
            user.getTotalSolved()
        );
    }
}
