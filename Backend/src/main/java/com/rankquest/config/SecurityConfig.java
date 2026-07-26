package com.rankquest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Security configuration for the application.
 * - Stateless JWT-based authentication (no sessions).
 * - Public endpoints for auth (login/signup/google), problems browsing, rankings, and H2 console.
 * - Protected endpoints for user-specific features (profile, submissions, activity).
 * - ADMIN-only endpoints under /api/admin/.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .headers(headers ->
                headers.frameOptions(frameOptions -> frameOptions.sameOrigin())
            )
            // Stateless: no server-side sessions
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // Fully public — no auth required for data browsing
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/signup",
                    "/api/auth/google",
                    "/api/problems/**",
                    "/api/patterns/**",
                    "/api/sheets/**",
                    "/api/rankings/**",
                    "/api/users/**",
                    "/api/submissions/**",
                    "/api/activity/**",
                    "/h2-console/**"
                ).permitAll()
                // Admin-only APIs
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // Everything else requires authentication (includes /api/auth/me, /api/users/**, /api/submissions/**, /api/activity/**)
                .anyRequest().authenticated()
            )
            // Add JWT filter before Spring's default auth filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}