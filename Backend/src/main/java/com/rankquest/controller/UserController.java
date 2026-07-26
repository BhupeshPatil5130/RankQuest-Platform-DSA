package com.rankquest.controller;

import com.rankquest.dto.ApiResponse;
import com.rankquest.dto.UpdateProfileRequest;
import com.rankquest.dto.UserProfileResponse;
import com.rankquest.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for user profile operations.
 * Extracts email from SecurityContextHolder if query parameter is omitted.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private String resolveEmail(String paramEmail) {
        if (paramEmail != null && !paramEmail.trim().isEmpty()) {
            return paramEmail.trim();
        }
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/profile-by-email")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(@RequestParam(required = false) String email) {
        String targetEmail = resolveEmail(email);
        ApiResponse<UserProfileResponse> response = userService.getProfileByEmail(targetEmail);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @RequestParam(required = false) String email,
            @RequestBody UpdateProfileRequest request
    ) {
        String targetEmail = resolveEmail(email);
        ApiResponse<UserProfileResponse> response = userService.updateProfile(targetEmail, request);
        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }
}
