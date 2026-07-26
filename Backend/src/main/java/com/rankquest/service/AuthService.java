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

    @Transactional(readOnly = true)
    public ApiResponse<UserProfileResponse> getCurrentUser(String email) {
        return userRepository.findByEmail(email)
            .map(user -> ApiResponse.success(UserProfileResponse.fromUser(user)))
            .orElse(ApiResponse.error("User not found"));
    }

    @Transactional
    public ApiResponse<LoginResponse> googleLogin(String idToken) {
        try {
            if (idToken == null || idToken.trim().isEmpty()) {
                return ApiResponse.error("Google token is required");
            }

            JsonNode tokenInfo = null;

            // 1. If it's a Google JWT ID Token (3 parts), decode payload directly (fastest & most reliable)
            String[] parts = idToken.split("\\.");
            if (parts.length == 3) {
                try {
                    byte[] decodedBytes = java.util.Base64.getUrlDecoder().decode(parts[1]);
                    JsonNode jwtPayload = objectMapper.readTree(decodedBytes);
                    if (jwtPayload.has("email") && !jwtPayload.path("email").asText().isEmpty()) {
                        tokenInfo = jwtPayload;
                    }
                } catch (Exception ignored) {}
            }

            // 2. If JWT decode wasn't applicable, query Google's userinfo endpoint
            if (tokenInfo == null || !tokenInfo.has("email")) {
                try {
                    HttpClient client = HttpClient.newHttpClient();
                    HttpRequest userinfoRequest = HttpRequest.newBuilder()
                            .uri(URI.create("https://www.googleapis.com/oauth2/v3/userinfo"))
                            .header("Authorization", "Bearer " + idToken)
                            .GET()
                            .build();
                    HttpResponse<String> response = client.send(userinfoRequest, HttpResponse.BodyHandlers.ofString());
                    if (response.statusCode() == 200) {
                        tokenInfo = objectMapper.readTree(response.body());
                    }
                } catch (Exception ignored) {}
            }

            // 3. Fallback to Google tokeninfo endpoint
            if (tokenInfo == null || !tokenInfo.has("email")) {
                try {
                    HttpClient client = HttpClient.newHttpClient();
                    HttpRequest tokeninfoRequest = HttpRequest.newBuilder()
                            .uri(URI.create("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken))
                            .GET()
                            .build();
                    HttpResponse<String> response = client.send(tokeninfoRequest, HttpResponse.BodyHandlers.ofString());
                    if (response.statusCode() == 200) {
                        tokenInfo = objectMapper.readTree(response.body());
                    }
                } catch (Exception ignored) {}
            }

            if (tokenInfo == null || !tokenInfo.has("email") || tokenInfo.path("email").asText().isEmpty()) {
                return ApiResponse.error("Invalid Google token or email not provided");
            }

            String email = tokenInfo.path("email").asText().toLowerCase().trim();
            String name = tokenInfo.path("name").asText();
            String givenName = tokenInfo.path("given_name").asText();

            final String finalEmail = email;
            final String finalName = name;

            User user = userRepository.findByEmail(finalEmail).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(finalEmail);
                String baseUsername = finalEmail.split("@")[0].replaceAll("[^a-zA-Z0-9_]", "_");
                String uniqueUsername = ensureUniqueUsername(baseUsername);
                newUser.setUsername(uniqueUsername);
                newUser.setFullName(finalName != null && !finalName.isEmpty() ? finalName : (givenName != null ? givenName : "User"));
                newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                newUser.setRole(Role.USER);
                return userRepository.save(newUser);
            });

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            LoginResponse loginResponse = new LoginResponse(token, UserProfileResponse.fromUser(user));
            return ApiResponse.success("Google login successful", loginResponse);

        } catch (Exception e) {
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
