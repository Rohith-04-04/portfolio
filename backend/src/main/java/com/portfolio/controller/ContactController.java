package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactRequest;
import com.portfolio.service.ContactService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST Controller exposing public endpoints for portfolio contact messages and health checking.
 */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    /**
     * Endpoint to submit a new message from the portfolio website.
     * Validates input against Bean Validation rules and stores in MySQL.
     */
    @PostMapping
    public ResponseEntity<ApiResponse> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {

        String clientIp = extractClientIp(httpRequest);
        ApiResponse response = contactService.processContact(request, clientIp);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Health check endpoint for uptime monitoring and deployment verification.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Eli Rohith Sri Ganesh - Portfolio Backend API",
            "version", "1.0.0"
        ));
    }

    /**
     * Diagnostic endpoint to test email delivery directly and inspect live SMTP status.
     */
    @GetMapping("/test-mail")
    public ResponseEntity<Map<String, Object>> testMail() {
        return ResponseEntity.ok(contactService.runMailDiagnostic());
    }


    /**
     * Extracts client IP address taking reverse proxies (e.g. Render, Cloudflare, NGINX) into account.
     */
    private String extractClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isBlank() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
