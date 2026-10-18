-- ==============================================================================
-- MySQL Database Schema for Portfolio Contact Messages
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS portfolio_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(100) NOT NULL,
    sender_email VARCHAR(120) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    submitted_at DATETIME NOT NULL,
    ip_address VARCHAR(45) NULL,
    email_notified BOOLEAN DEFAULT FALSE,
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_sender_email (sender_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
