package com.rankquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response returned after successful login.
 * Contains JWT token + user profile data for frontend storage.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private UserProfileResponse user;
}