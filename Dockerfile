# Multi-stage Dockerfile for Portfolio Spring Boot Backend + Frontend UI (All-in-One)
# Runtime: Java 17 (Eclipse Temurin Alpine)

# Stage 1: Build stage
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY backend/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B
COPY backend/src ./src
# Bundle the frontend directly into Spring Boot static resources!
COPY frontend ./src/main/resources/static
RUN mvn clean package -DskipTests

# Stage 2: Lightweight runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
