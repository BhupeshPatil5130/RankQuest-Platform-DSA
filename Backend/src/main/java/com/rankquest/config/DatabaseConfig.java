package com.rankquest.config;

/**
 * DatabaseConfig is intentionally REMOVED.
 *
 * Database configuration is now handled by two mechanisms:
 *
 * 1. DatabaseUrlProcessor (EnvironmentPostProcessor) — runs before any bean is created,
 *    transforms DATABASE_URL (postgres:// format from Render/Heroku/Railway) into
 *    standard spring.datasource.* properties.
 *
 * 2. Spring Boot's DataSourceAutoConfiguration — uses spring.datasource.* properties
 *    to create a properly configured HikariCP DataSource automatically.
 *
 * This approach is simpler, more reliable, and avoids custom bean / JPA auto-config conflicts.
 *
 * See: application.properties for defaults (H2 in-memory when no DATABASE_URL is set)
 *      META-INF/spring.factories for DatabaseUrlProcessor registration
 */
// This file is intentionally left as a no-op placeholder to preserve git history.
// The actual DataSource bean is fully managed by Spring Boot auto-configuration.
