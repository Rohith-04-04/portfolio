package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Service for sending email notifications when new contact submissions are made.
 * Gracefully handles unconfigured or unavailable mail environments without throwing runtime failures.
 */
@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${portfolio.mail.recipient:rohitheli4444@gmail.com}")
    private String recipientEmail;

    @Value("${spring.mail.username:}")
    private String mailSenderFrom;

    @Autowired(required = false)
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends an email notification asynchronously so that the HTTP API response is immediate.
     */
    @Async
    public void sendContactNotification(ContactMessage message) {
        if (mailSender == null || mailSenderFrom == null || mailSenderFrom.isBlank()) {
            log.info("Email service is not active (SMTP username unconfigured). Skipping email dispatch for message ID: {}", message.getId());
            return;
        }

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(mailSenderFrom);
            mail.setTo(recipientEmail);
            mail.setReplyTo(message.getSenderEmail());
            mail.setSubject("[Portfolio Inquiry] " + message.getSubject());

            String content = String.format(
                "You have received a new message from your portfolio website:\n\n" +
                "--------------------------------------------------\n" +
                "Sender Name  : %s\n" +
                "Sender Email : %s\n" +
                "Subject      : %s\n" +
                "Submitted At : %s\n" +
                "IP Address   : %s\n" +
                "--------------------------------------------------\n\n" +
                "Message:\n%s\n\n" +
                "--------------------------------------------------\n" +
                "Sent automatically by Eli Rohith's Portfolio Backend (Spring Boot 3 / MySQL)",
                message.getSenderName(),
                message.getSenderEmail(),
                message.getSubject(),
                message.getSubmittedAt(),
                message.getIpAddress(),
                message.getMessage()
            );

            mail.setText(content);
            mailSender.send(mail);

            log.info("Successfully sent email notification for contact message ID: {}", message.getId());
            message.setEmailNotified(true);
        } catch (Exception e) {
            log.warn("Failed to dispatch email notification for contact message ID {}: {}", message.getId(), e.getMessage());
        }
    }
}
