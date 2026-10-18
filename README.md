# Professional Developer Portfolio — Eli Rohith Sri Ganesh

A high-performance, minimal, light-themed developer portfolio and full-stack contact management application built for campus placements, HR recruiters, and software engineering opportunities.

---

## 1. Technology Architecture

| Layer | Technologies Used | Key Responsibilities |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) | Semantic layout, light-mode design, responsive mobile-first grid, client-side validation, asynchronous REST API integration, credential viewer modals. |
| **Backend** | Java 17, Spring Boot 3.3.8, Spring Web | Asynchronous REST APIs, Bean Validation (`@Valid`), CORS security, bot honeypot filtering, error translation without leaking stack traces. |
| **Data Layer** | Spring Data JPA, MySQL 8 | Relational persistence, transactional safety (`@Transactional`), indexed timestamps, automated DDL schema migrations. |
| **Notifications** | Spring Boot Starter Mail (`JavaMailSender`) | Asynchronous email notifications to `rohitheli4444@gmail.com` via standard SMTP (Gmail SMTP App Password) with graceful offline fallback. |

---

## 2. Directory Structure

```text
portfolio/
├── frontend/
│   ├── index.html                 # Semantic HTML5 single-page application
│   ├── css/
│   │   └── style.css              # Light-theme CSS (Inter typography, responsive grid, zero canvas bloat)
│   ├── js/
│   │   └── app.js                 # Validation, REST API fetch, modals, character counter, clipboard
│   └── assets/
│       ├── profile-avatar.svg     # Clean vector placeholder avatar (customizable to real photo)
│       └── Eli_Rohith_Sri_Ganesh_Resume.pdf  # Publicly downloadable 1-page resume
│
└── backend/
    ├── pom.xml                    # Maven configuration (Java 17, Spring Boot 3.3.8, MySQL, Mail)
    ├── Dockerfile                 # Multi-stage production container build (Eclipse Temurin 17 Alpine)
    ├── .env.example               # Environment variables template (placeholders only)
    ├── src/
    │   ├── main/
    │   │   ├── java/com/portfolio/
    │   │   │   ├── PortfolioBackendApplication.java  # Application entrypoint (@EnableAsync)
    │   │   │   ├── config/
    │   │   │   │   └── CorsConfig.java               # CORS configuration for frontend origin
    │   │   │   ├── controller/
    │   │   │   │   └── ContactController.java        # POST /api/contact, GET /api/contact/health
    │   │   │   ├── dto/
    │   │   │   │   ├── ApiResponse.java              # Standardized API response structure
    │   │   │   │   └── ContactRequest.java           # Validated request DTO + Honeypot field
    │   │   │   ├── exception/
    │   │   │   │   └── GlobalExceptionHandler.java   # Centralized bean validation error mapper
    │   │   │   ├── model/
    │   │   │   │   └── ContactMessage.java           # JPA Entity for MySQL persistence
    │   │   │   ├── repository/
    │   │   │   │   └── ContactMessageRepository.java # Spring Data JPA repository
    │   │   │   └── service/
    │   │   │       ├── ContactService.java           # Persistence and bot filtering logic
    │   │   │       └── EmailService.java             # Async JavaMailSender email dispatcher
    │   │   └── resources/
    │   │       ├── application.properties            # Config with env variable overrides
    │   │       └── schema.sql                        # MySQL DDL table script
    │   └── test/
    │       └── java/com/portfolio/
    │           └── ContactControllerTest.java        # JUnit 5 MockMvc test suite
    └── README.md
```

---

## 3. Local Development Setup

### Prerequisites
- **Frontend**: Any modern web browser.
- **Backend**: JDK 17+ and Apache Maven 3.8+ (or Docker).
- **Database**: MySQL Server 8.0+ running locally on port 3306 (or Docker MySQL).

### A. Database Setup
Log in to your local MySQL server and create the database:

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

*(Spring Data JPA will automatically create and update the `contact_messages` table on first startup).*

### B. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd portfolio/backend
   ```
2. Configure your environment variables or update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/portfolio_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. (Optional) Configure Gmail SMTP for email notifications:
   ```properties
   spring.mail.username=your_email@gmail.com
   spring.mail.password=your_16_char_google_app_password
   ```
   *Note: If you leave SMTP blank, the backend will safely save all contact messages in MySQL and log a notification without failing the HTTP request.*
4. Compile and start the Spring Boot application:
   ```bash
   mvn clean spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.
5. Verify health:
   ```bash
   curl http://localhost:8080/api/contact/health
   ```
   Response: `{"service":"Eli Rohith Sri Ganesh - Portfolio Backend API","status":"UP","version":"1.0.0"}`

### C. Frontend Setup
1. Open `portfolio/frontend/index.html` directly in your web browser, or serve it using any local static server:
   - VS Code: Right-click `index.html` -> **Open with Live Server** (runs on `http://127.0.0.1:5500`)
   - Python: `python -m http.server 5500` inside `portfolio/frontend`
2. Test submitting the contact form to confirm messages reach the backend and save into MySQL.

---

## 4. How to Update Personal Assets

1. **Profile Photograph**:
   - Save your formal portrait image as `portfolio/frontend/assets/profile.jpg` or `profile.png`.
   - In `portfolio/frontend/index.html`, update line 133:
     ```html
     <img src="assets/profile.jpg" alt="Eli Rohith Sri Ganesh" class="profile-photo" id="profileImage">
     ```
2. **Resume PDF**:
   - Place your updated 1-page PDF at `portfolio/frontend/assets/Eli_Rohith_Sri_Ganesh_Resume.pdf`.

---

## 5. Free Deployment Guide

### Step 1: Free MySQL Database
Choose one of the following 100% free MySQL providers:
- **TiDB Serverless** (`https://tidbcloud.com`): 5 GB free storage, fully MySQL 8 wire-compatible, SSL enabled.
- **Aiven Free MySQL** (`https://aiven.io`): 5 GB free cloud MySQL instance.
- **Clever Cloud** (`https://www.clever-cloud.com`): Free MySQL add-on.

Copy your connection string (`host`, `port`, `database`, `user`, `password`).

### Step 2: Free Backend Deployment (Render Web Service)
1. Push the `portfolio` folder or repository to GitHub (`https://github.com/Rohith-04-04/portfolio-backend`).
2. Log into [Render](https://render.com) (Rohith already has an active Render account for other projects).
3. Click **New +** -> **Web Service**.
4. Select your repository and choose **Docker** runtime (Render automatically detects `portfolio/backend/Dockerfile`).
5. Add the following **Environment Variables** in the Render Dashboard:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<your-db-host>:<port>/<db-name>?useSSL=true&allowPublicKeyRetrieval=true`
   - `SPRING_DATASOURCE_USERNAME`: `<db-user>`
   - `SPRING_DATASOURCE_PASSWORD`: `<db-password>`
   - `SPRING_MAIL_HOST`: `smtp.gmail.com`
   - `SPRING_MAIL_PORT`: `587`
   - `SPRING_MAIL_USERNAME`: `rohitheli4444@gmail.com`
   - `SPRING_MAIL_PASSWORD`: `<your-google-app-password>`
   - `PORTFOLIO_CORS_ALLOWED_ORIGINS`: `https://rohith-04-04.github.io`
6. Click **Deploy Web Service**. Once deployed, Render will provide a free HTTPS URL (e.g. `https://portfolio-backend-xxxx.onrender.com`).

### Step 3: Free Frontend Deployment (GitHub Pages)
1. Push `portfolio/frontend` to a GitHub repository (e.g. `https://github.com/Rohith-04-04/portfolio` or `Rohith-04-04.github.io`).
2. In `portfolio/frontend/js/app.js` (line 12), update `API_BASE_URL` with your live Render backend URL:
   ```javascript
   const API_BASE_URL = window.PORTFOLIO_API_URL || 'https://portfolio-backend-xxxx.onrender.com';
   ```
3. Go to Repository **Settings** -> **Pages** -> Source: **Deploy from a branch** -> Branch: `main` / `root`.
4. Your website is live at `https://rohith-04-04.github.io/portfolio`!

---

## 6. Security & Spam Protection Highlights

- **Zero Secrets in Code**: All sensitive credentials (database passwords, mail credentials) are injected exclusively via environment variables.
- **Honeypot Bot Trap**: An invisible form field (`website`) traps automated web scrapers and bot submissions without presenting friction (like intrusive CAPTCHAs) to recruiters.
- **Input Sanitization & Length Bounds**: Client-side and server-side validation strictly enforce type, format, and character boundaries (max 100 for name, max 120 for email, max 2000 for message).
- **Graceful Error Handling**: Database connection dropouts or SMTP failures log detailed server diagnostics internally but present user-friendly error banners without exposing Java stack traces or database schema internals.
