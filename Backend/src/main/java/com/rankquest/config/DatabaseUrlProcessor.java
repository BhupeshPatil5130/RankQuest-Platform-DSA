package com.rankquest.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * EnvironmentPostProcessor — runs before ANY Spring bean or @Value is resolved.
 *
 * Transforms DATABASE_URL (postgres://, postgresql://, or jdbc:postgresql:// formats)
 * into the canonical spring.datasource.* properties so Spring Boot's DataSource
 * auto-configuration works correctly with no custom DataSource bean needed.
 *
 * Also wires DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_DRIVER env vars.
 * Sets the correct Hibernate dialect for PostgreSQL vs H2.
 *
 * Registration: META-INF/spring.factories
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
public class DatabaseUrlProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String databaseUrl = environment.getProperty("DATABASE_URL");

        // ── No DATABASE_URL → use H2 defaults from application.properties ──────
        if (databaseUrl == null || databaseUrl.trim().isEmpty()) {
            System.out.println("ℹ️ No DATABASE_URL set — using H2 in-memory database.");
            return;
        }

        databaseUrl = databaseUrl.trim();
        // Strip surrounding quotes (e.g. VALUE="jdbc:..." in some platforms)
        if (databaseUrl.startsWith("\"") && databaseUrl.endsWith("\"")) {
            databaseUrl = databaseUrl.substring(1, databaseUrl.length() - 1);
        }

        Map<String, Object> props = new LinkedHashMap<>();

        // ── Already a proper JDBC URL (jdbc:postgresql:// or jdbc:...) ────────
        if (databaseUrl.startsWith("jdbc:")) {
            props.put("spring.datasource.url", databaseUrl);

            // Wire driver from DATABASE_DRIVER env var, default to PostgreSQL
            String driver = environment.getProperty("DATABASE_DRIVER");
            props.put("spring.datasource.driver-class-name",
                    (driver != null && !driver.trim().isEmpty()) ? driver.trim() : "org.postgresql.Driver");

            // Wire credentials from DATABASE_USERNAME / DATABASE_PASSWORD env vars
            String username = environment.getProperty("DATABASE_USERNAME");
            String password = environment.getProperty("DATABASE_PASSWORD");
            if (username != null && !username.trim().isEmpty()) props.put("spring.datasource.username", username.trim());
            if (password != null && !password.trim().isEmpty()) props.put("spring.datasource.password", password.trim());

            // Use PostgreSQL Hibernate dialect (not H2 default)
            if (databaseUrl.contains(":postgresql:")) {
                props.put("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
                props.put("spring.jpa.properties.hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
            }

            System.out.println("✅ DatabaseUrlProcessor: Configured from JDBC DATABASE_URL (PostgreSQL).");
            environment.getPropertySources().addFirst(new MapPropertySource("db-url-override", props));
            return;
        }

        // ── postgres:// or postgresql:// (Render / Heroku / Railway raw format) ──
        if (databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://")) {
            try {
                String cleanUrl = databaseUrl;
                if (cleanUrl.startsWith("postgres://")) {
                    cleanUrl = "postgresql://" + cleanUrl.substring("postgres://".length());
                }

                URI uri = new URI(cleanUrl);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();

                // Prefer explicit env vars for credentials; fall back to URI userInfo
                String username = environment.getProperty("DATABASE_USERNAME");
                String password = environment.getProperty("DATABASE_PASSWORD");

                if (uri.getUserInfo() != null && (username == null || username.trim().isEmpty())) {
                    String[] parts = uri.getUserInfo().split(":", 2);
                    username = parts[0];
                    if (parts.length > 1 && (password == null || password.trim().isEmpty())) {
                        password = parts[1];
                    }
                }

                // Build JDBC URL
                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                // Preserve existing query params (e.g. sslmode=require)
                String query = uri.getQuery();
                jdbcUrl += (query != null && !query.isEmpty()) ? "?" + query : "?sslmode=require";

                props.put("spring.datasource.url", jdbcUrl);
                props.put("spring.datasource.driver-class-name", "org.postgresql.Driver");
                if (username != null && !username.trim().isEmpty()) props.put("spring.datasource.username", username.trim());
                if (password != null && !password.trim().isEmpty()) props.put("spring.datasource.password", password.trim());
                props.put("spring.jpa.database-platform", "org.hibernate.dialect.PostgreSQLDialect");
                props.put("spring.jpa.properties.hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");

                System.out.println("✅ DatabaseUrlProcessor: Converted postgres:// → JDBC URL.");
                environment.getPropertySources().addFirst(new MapPropertySource("db-url-override", props));

            } catch (Exception e) {
                System.err.println("⚠️ DatabaseUrlProcessor: Could not parse DATABASE_URL (" + e.getMessage() + "). Falling back to H2.");
            }
            return;
        }

        System.err.println("⚠️ DatabaseUrlProcessor: Unrecognised DATABASE_URL format. Falling back to H2.");
    }
}
