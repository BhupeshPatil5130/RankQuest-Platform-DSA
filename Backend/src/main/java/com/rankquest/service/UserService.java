package com.rankquest.service;

import com.rankquest.dto.ApiResponse;
import com.rankquest.dto.UpdateProfileRequest;
import com.rankquest.dto.UserProfileResponse;
import com.rankquest.exception.ResourceNotFoundException;
import com.rankquest.model.User;
import com.rankquest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service layer for user profile operations.
 * Handles fetching and updating user profile data.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user profile by email address.
     */
    @Transactional(readOnly = true)
    public ApiResponse<UserProfileResponse> getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        return ApiResponse.success(UserProfileResponse.fromUser(user));
    }

    /**
     * Update user profile. Only updates non-null fields from the request.
     */
    @Transactional
    public ApiResponse<UserProfileResponse> updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getCollege() != null) user.setCollege(request.getCollege());
        if (request.getBranch() != null) user.setBranch(request.getBranch());
        if (request.getYear() != null) user.setYear(request.getYear());
        if (request.getRollNumber() != null) user.setRollNumber(request.getRollNumber());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getUsername() != null && !request.getUsername().isBlank()
                && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                return ApiResponse.error("Username is already taken");
            }
            user.setUsername(request.getUsername());
        }

        User saved = userRepository.save(user);
        return ApiResponse.success("Profile updated successfully", UserProfileResponse.fromUser(saved));
    }

    /**
     * Internal helper to get a User entity by email. Used by other services.
     */
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
