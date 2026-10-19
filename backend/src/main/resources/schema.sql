-- ==============================================================================
-- Database Schema for Portfolio Contact Messages (Reference Schema)
-- Note: Spring Data JPA / Hibernate automatically manages table creation.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(120) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45) NULL,
    email_notified BOOLEAN DEFAULT FALSE
);

