package com.rankquest.service;

import com.rankquest.dto.*;
import com.rankquest.model.Role;
import com.rankquest.model.User;
import com.rankquest.repository.UserRepository;
import com.rankquest.util.JwtUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

/**
 * Service layer for authentication operations.
 * Handles signup validation, password hashing, login verification, JWT generation,
 * and Google OAuth sign-in (find-or-create pattern).
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    @Value("${google.client-id:}")
    private String googleClientId;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Register a new user account.
     * Validates uniqueness of username and email before creation.
     */
    @Transactional
    public ApiResponse<UserProfileResponse> signup(SignUpRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ApiResponse.error("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email is already in use");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setFullName(request.getFullName());
        user.setCollege(request.getCollege());
        user.setBranch(request.getBranch());
        user.setYear(request.getYear());
        user.setRollNumber(request.getRollNumber());

        User saved = userRepository.save(user);
        return ApiResponse.success("User registered successfully", UserProfileResponse.fromUser(saved));
    }

    /**
     * Authenticate a user and return a JWT token with their profile.
     */
    @Transactional(readOnly = true)
    public ApiResponse<LoginResponse> login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail().toLowerCase().trim())
            .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()))
            .map(user -> {
                String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
                LoginResponse loginResponse = new LoginResponse(token, UserProfileResponse.fromUser(user));
                return ApiResponse.success("Login successful", loginResponse);
            })
            .orElse(ApiResponse.error("Invalid email or password"));
    }

    /**
     * Get the current user profile from their email (extracted from JWT).
     */
    @Transactional(readOnly = true)
    public ApiResponse<UserProfileResponse> getCurrentUser(String email) {
        return userRepository.findByEmail(email)
            .map(user -> ApiResponse.success(UserProfileResponse.fromUser(user)))
            .orElse(ApiResponse.error("User not found"));
    }

    /**
     * Google OAuth sign-in: verify the ID token with Google's tokeninfo endpoint.
     * If user exists, return JWT. If not, create a new account (find-or-create pattern).
     *
     * @param idToken The Google ID token from the frontend
     * @return JWT + profile on success, error on failure
     */
    @Transactional
    public ApiResponse<LoginResponse> googleLogin(String idToken) {
        try {
            // Verify token with Google's tokeninfo endpoint
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return ApiResponse.error("Invalid Google token");
            }

            JsonNode tokenInfo = objectMapper.readTree(response.body());

            // Verify the audience matches our client ID (skip check if client ID not configured)
            if (!googleClientId.isEmpty()) {
                String audience = tokenInfo.path("aud").asText();
                if (!googleClientId.equals(audience)) {
                    return ApiResponse.error("Token audience mismatch");
                }
            }

            String email = tokenInfo.path("email").asText();
            String name = tokenInfo.path("name").asText();
            String givenName = tokenInfo.path("given_name").asText();

            if (email == null || email.isEmpty()) {
                return ApiResponse.error("Email not provided by Google");
            }

            email = email.toLowerCase().trim();

            // Find existing user or create new one
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                // Generate a unique username from email prefix
                String baseUsername = email.split("@")[0].replaceAll("[^a-zA-Z0-9_]", "_");
                String uniqueUsername = ensureUniqueUsername(baseUsername);
                newUser.setUsername(uniqueUsername);
                newUser.setFullName(name != null && !name.isEmpty() ? name : givenName);
                // Google users don't have a local password — set a random secure one
                newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                newUser.setRole(Role.USER);
                return userRepository.save(newUser);
            });

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            LoginResponse loginResponse = new LoginResponse(token, UserProfileResponse.fromUser(user));
            return ApiResponse.success("Google login successful", loginResponse);

        } catch (IOException | InterruptedException e) {
            Thread.currentThread().interrupt();
            return ApiResponse.error("Failed to verify Google token: " + e.getMessage());
        }
    }

    /**
     * Ensures the username is unique by appending a number suffix if needed.
     */
    private String ensureUniqueUsername(String baseUsername) {
        String username = baseUsername;
        int suffix = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + suffix;
            suffix++;
        }
        return username;
    }
}
