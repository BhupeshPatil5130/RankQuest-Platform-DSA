package com.rankquest.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

/**
 * Dynamic DataSource configuration for seamless cloud deployment (Render, Railway, Heroku, AWS).
 * Automatically converts postgres:// or postgresql:// URLs into valid JDBC URLs with HikariCP.
 * Defaults to H2 in-memory database when no DATABASE_URL is supplied.
 */
@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:#{null}}")
    private String rawDatabaseUrl;

    @Value("${DATABASE_USERNAME:#{null}}")
    private String rawUsername;

    @Value("${DATABASE_PASSWORD:#{null}}")
    private String rawPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        if (rawDatabaseUrl == null || rawDatabaseUrl.trim().isEmpty()) {
            // Default: H2 in-memory database for dev or light deployments
            return DataSourceBuilder.create()
                    .driverClassName("org.h2.Driver")
                    .url("jdbc:h2:mem:rankquest;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE")
                    .username("sa")
                    .password("")
                    .build();
        }

        String dbUrl = rawDatabaseUrl.trim();
        String username = rawUsername;
        String password = rawPassword;

        // Convert postgres:// or postgresql:// format (used by Render, Heroku, Railway)
        if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) {
            try {
                // Strip "jdbc:" if already present to parse URI cleanly
                String cleanUrl = dbUrl.startsWith("jdbc:") ? dbUrl.substring(5) : dbUrl;
                if (cleanUrl.startsWith("postgres://")) {
                    cleanUrl = "postgresql://" + cleanUrl.substring(11);
                }
                
                URI uri = new URI(cleanUrl);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();

                if (uri.getUserInfo() != null) {
                    String[] userInfo = uri.getUserInfo().split(":");
                    if (username == null || username.trim().isEmpty()) {
                        username = userInfo[0];
                    }
                    if ((password == null || password.trim().isEmpty()) && userInfo.length > 1) {
                        password = userInfo[1];
                    }
                }

                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                if (uri.getQuery() != null) {
                    jdbcUrl += "?" + uri.getQuery();
                }

                HikariDataSource ds = new HikariDataSource();
                ds.setDriverClassName("org.postgresql.Driver");
                ds.setJdbcUrl(jdbcUrl);
                if (username != null) ds.setUsername(username);
                if (password != null) ds.setPassword(password);
                ds.setConnectionTimeout(10000);
                ds.setInitializationFailTimeout(10000);
                return ds;
            } catch (Exception e) {
                System.err.println("⚠️ Error parsing DATABASE_URL, using raw URL: " + e.getMessage());
            }
        }

        // Standard JDBC URL
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(dbUrl);
        if (username != null && !username.trim().isEmpty()) ds.setUsername(username.trim());
        if (password != null && !password.trim().isEmpty()) ds.setPassword(password.trim());
        ds.setConnectionTimeout(10000);
        ds.setInitializationFailTimeout(10000);
        return ds;
    }
}
