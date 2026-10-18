package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Incoming Request DTO for contact submissions with strict Bean Validation.
 */
public class ContactRequest {

    @NotBlank(message = "Please enter your name.")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters.")
    private String senderName;

    @NotBlank(message = "Please enter your email address.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 120, message = "Email cannot exceed 120 characters.")
    private String senderEmail;

    @NotBlank(message = "Please provide a subject line.")
    @Size(min = 3, max = 150, message = "Subject must be between 3 and 150 characters.")
    private String subject;

    @NotBlank(message = "Please enter your message.")
    @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters.")
    private String message;

    // Honeypot field: real users leave this blank; spam bots tend to auto-populate it
    private String honeypot;

    public ContactRequest() {
    }

    public ContactRequest(String senderName, String senderEmail, String subject, String message, String honeypot) {
        this.senderName = senderName;
        this.senderEmail = senderEmail;
        this.subject = subject;
        this.message = message;
        this.honeypot = honeypot;
    }

    // Getters and Setters
    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getHoneypot() {
        return honeypot;
    }

    public void setHoneypot(String honeypot) {
        this.honeypot = honeypot;
    }
}
