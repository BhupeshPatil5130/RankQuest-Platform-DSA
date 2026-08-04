# =========================
# Stage 1 - Build (Root Context for Runsite / Railway / Cloud Deployments)
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY Backend/pom.xml ./pom.xml
COPY Backend/src ./src

RUN mvn clean package -DskipTests

# =========================
# Stage 2 - Run
# =========================
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
