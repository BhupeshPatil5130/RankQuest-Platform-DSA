package com.rankquest.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for Google OAuth sign-in.
 * Frontend sends the Google ID token (credential) after the user clicks "Sign in with Google".
 * Backend verifies it against Google's token info endpoint.
 */
public class GoogleTokenRequest {

    @NotBlank(message = "ID token is required")
    private String idToken;

    public GoogleTokenRequest() {}

    public GoogleTokenRequest(String idToken) {
        this.idToken = idToken;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }
}
