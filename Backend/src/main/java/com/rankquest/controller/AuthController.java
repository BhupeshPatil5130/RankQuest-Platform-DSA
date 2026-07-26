package com.rankquest.controller;

import com.rankquest.dto.*;
import com.rankquest.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication endpoints.
 * Thin controller — all business logic is in AuthService.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user. Validates input via @Valid.
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserProfileResponse>> registerUser(
            @Valid @RequestBody SignUpRequest request) {
        ApiResponse<UserProfileResponse> response = authService.signup(request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Authenticate user and return JWT token + profile.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> authenticateUser(
            @Valid @RequestBody LoginRequest request) {
        ApiResponse<LoginResponse> response = authService.login(request);
        if (!response.isSuccess()) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Google OAuth sign-in.
     * Accepts the Google ID token from the frontend, verifies with Google,
     * then find-or-creates a user and returns a JWT.
     */
    @PostMapping("/google")
    public ResponseEntity<ApiResponse<LoginResponse>> googleSignIn(
            @Valid @RequestBody GoogleTokenRequest request) {
        ApiResponse<LoginResponse> response = authService.googleLogin(request.getIdToken());
        if (!response.isSuccess()) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Get the current authenticated user's profile from their JWT token.
     * The email is extracted from the Spring Security context (populated by JwtAuthFilter).
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ApiResponse<UserProfileResponse> response = authService.getCurrentUser(email);
        if (!response.isSuccess()) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
    }
}