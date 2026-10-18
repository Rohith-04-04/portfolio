package com.portfolio.service;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactRequest;
import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service managing contact submission persistence, spam mitigation, and notification orchestration.
 */
@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    @Autowired
    public ContactService(ContactMessageRepository contactMessageRepository, EmailService emailService) {
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    @Transactional
    public ApiResponse processContact(ContactRequest request, String ipAddress) {
        // Honeypot spam defense: bots auto-fill hidden input fields
        if (request.getHoneypot() != null && !request.getHoneypot().trim().isEmpty()) {
            log.warn("Detected bot submission via honeypot field from IP: {}. Ignored silently.", ipAddress);
            return ApiResponse.ok("Thank you! Your message has been received.");
        }

        // Create and persist the contact entity in MySQL
        ContactMessage message = new ContactMessage(
            request.getSenderName().trim(),
            request.getSenderEmail().trim(),
            request.getSubject().trim(),
            request.getMessage().trim(),
            ipAddress
        );

        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Saved contact message from {} ({}) with ID: {}", saved.getSenderName(), saved.getSenderEmail(), saved.getId());

        // Dispatch async email notification
        emailService.sendContactNotification(saved);

        return ApiResponse.ok("Thank you! Your message has been received and saved successfully.");
    }
}
