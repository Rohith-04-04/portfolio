/**
 * Eli Rohith Sri Ganesh — Professional Developer Portfolio
 * Interactive Handlers: Skills Panel, Project Modal, Certificate PDF Viewer, Contact API
 */

(function () {
  'use strict';

  // API Config (Uses relative path when hosted on same Spring Boot server or custom override)
  const API_BASE_URL = window.PORTFOLIO_API_URL || '';
  const CONTACT_API_ENDPOINT = `${API_BASE_URL}/api/contact`;

  // ============================================================================
  // Skills Usage Database (Opens on clicking skill in train marquee)
  // ============================================================================
  const SKILLS_DATA = {
    java: {
      name: 'Java (Core, OOP, Multithreading, Collections)',
      usage: 'Implemented in the Digital Wallet P2P Engine (concurrency row-level locking, ACID transactions), AI-Based Credit Risk & Loan Approval backend, and Student Management System. Validated across 12 JUnit 5 test cases.',
      tags: ['Digital Wallet', 'Loan Approval System', 'Student Management System', 'LeetCode DSA']
    },
    springboot: {
      name: 'Spring Boot 3 (Web, JPA, Security)',
      usage: 'Architected RESTful microservices following Controller-Service-Repository patterns in the Digital Wallet, Loan Approval System, and Student Management System. Implemented @Transactional boundaries, JWT authentication, and bean validation.',
      tags: ['Spring Web', 'Spring Data JPA', 'Spring Security', 'Flyway']
    },
    dsa: {
      name: 'Data Structures & Algorithms',
      usage: 'Solved 100+ problems on LeetCode covering Dynamic Programming, Hash Tables, Two Pointers, and Arrays. Applied algorithmic tree/graph traversal and deterministic financial risk scoring logic.',
      tags: ['LeetCode 100+', 'Dynamic Programming', 'Hash Tables', 'Arrays & Two Pointers']
    },
    restapi: {
      name: 'RESTful API Architecture',
      usage: 'Engineered clean HTTP web services with JSON payloads, idempotency key deduplication, and documented endpoints using Swagger / OpenAPI UI and Postman collections.',
      tags: ['Swagger / OpenAPI', 'Postman Collections', 'HTTP Status Codes', 'Idempotency']
    },
    sql: {
      name: 'SQL & Relational Databases (MySQL)',
      usage: 'Designed normalized schemas, foreign key constraints, composite indexes, and executed complex JOINs for the Loan Approval System, Digital Wallet ledger auditing, and Student Management System.',
      tags: ['MySQL', 'Pessimistic Locking', 'Flyway Migrations', 'ACID Transactions']
    },
    aws: {
      name: 'Amazon Web Services (AWS)',
      usage: 'Validated foundational cloud knowledge with AWS Educate Credly Badge. Hands-on understanding of Amazon EC2 compute instances, Amazon S3 storage classes, IAM policies, and cloud security paradigms.',
      tags: ['AWS Educate Badge', 'Amazon EC2', 'Amazon S3', 'IAM & Cloud Security']
    },
    sdlc: {
      name: 'SDLC & Agile Methodologies',
      usage: 'Collaborated in Agile sprint cycles during the EduSkills Foundation internship, participating in requirement breakdown, code reviews, peer feedback, and iterative versioning.',
      tags: ['Agile Sprints', 'Code Reviews', 'Peer Collaboration', 'Version Control']
    },
    git: {
      name: 'Git & GitHub',
      usage: 'Version control workflows across all repositories, maintaining branch branching strategies, pull requests, conventional commit histories, and open-source documentation.',
      tags: ['Branching', 'Pull Requests', 'Git CLI', 'GitHub Repositories']
    },
    docker: {
      name: 'Docker & Containerization',
      usage: 'Authored multi-stage Dockerfiles utilizing Eclipse Temurin 17 Alpine images for lightweight production container builds deployed to cloud platforms (Render).',
      tags: ['Multi-Stage Dockerfile', 'Eclipse Temurin 17', 'Container Deployment', 'Render']
    },
    cicd: {
      name: 'CI/CD Pipelines',
      usage: 'Configured automated cloud deployment blueprints (render.yaml) and container image packaging for frictionless continuous deployment.',
      tags: ['Automated Builds', 'Render Blueprints', 'Container Registry']
    },
    html5: {
      name: 'HTML5 Semantic Architecture',
      usage: 'Authored semantic documents using header, main, section, article, nav, and dialog elements. Ensured high readability, keyboard accessibility, and SEO meta tags.',
      tags: ['Semantic Elements', 'Web Accessibility (a11y)', 'SEO Meta', 'DOM Structure']
    },
    css3: {
      name: 'CSS3 Modern Layouts & Styling',
      usage: 'Implemented responsive layouts with Flexbox and CSS Grid, fluid typography via clamp(), custom CSS properties (variables), subtle transitions, and media queries.',
      tags: ['CSS Grid & Flexbox', 'CSS Custom Properties', 'Responsive Design', 'clamp() Fluid Layout']
    },
    python: {
      name: 'Python (Data Analysis & EDA)',
      usage: 'Utilized in the Economic Freedom Index analytics project to ingest raw macroeconomic datasets, perform statistical exploratory data analysis, clean nulls/outliers with Pandas, and export curated sets for Tableau Public.',
      tags: ['Pandas', 'Data Cleaning', 'Exploratory Data Analysis', 'Statistical Correlations']
    },
    htmlcss: {
      name: 'HTML5 & CSS3',
      usage: 'Designed semantic web pages, responsive flexbox/grid layouts, accessibility attributes, CSS variables, and clean light-themed UI interfaces.',
      tags: ['Semantic HTML5', 'Responsive CSS3', 'Flexbox & CSS Grid', 'Mobile First']
    },
    javascript: {
      name: 'JavaScript (ES6+)',
      usage: 'Developed client-side validation, asynchronous fetch API communication with Spring Boot endpoints, interactive modals, and clipboard copy helpers.',
      tags: ['Fetch API', 'DOM Manipulation', 'Async/Await', 'Event Listeners']
    },
    react: {
      name: 'React (Basics)',
      usage: 'Fundamental comprehension of React functional components, props, state management hooks (useState, useEffect), and JSX rendering.',
      tags: ['Functional Components', 'Hooks (useState, useEffect)', 'JSX Architecture']
    }
  };

  // ============================================================================
  // Project Details Database (Opens on clicking project card)
  // ============================================================================
  const PROJECTS_DATA = {
    loan: {
      title: 'AI-Based Credit Risk Assessment & Automated Loan Approval System',
      image: 'assets/project-loan.png',
      problem: 'Traditional loan approval pipelines suffer from manual underwriting delays, human evaluation bias, and subjective risk calculations across high application volumes.',
      solution: 'Engineered an automated financial backend using Spring Boot 3, Java 17, and MySQL. Implemented deterministic risk decisioning evaluating applicant income, debt-to-income (DTI) metrics, and credit score tiers for real-time evaluations.',
      highlights: [
        'Deterministic risk decisioning algorithm analyzing applicant income, credit score thresholds, and DTI metrics.',
        'Stateless JWT authentication with Role-Based Access Control (ROLE_ADMIN, ROLE_CUSTOMER).',
        'Database versioning and schema migrations managed via Flyway.',
        'Docker container deployment running on Render cloud services.'
      ],
      tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'Spring Data JPA', 'Spring Security', 'JWT', 'Flyway', 'Docker'],
      github: 'https://github.com/Rohith-04-04/AI-Based-Credit-Risk-Assessment-and-Loan-Approval-System-',
      liveDemo: 'https://ai-based-credit-risk-assessment-and-loan-tyib.onrender.com'
    },
    wallet: {
      title: 'Digital Wallet & High-Concurrency P2P Payment Engine',
      image: 'assets/project-wallet.svg',
      problem: 'High-frequency peer-to-peer balance transfers are vulnerable to race conditions, balance inconsistencies, and double-spending when processed concurrently.',
      solution: 'Architected a transactional P2P microservice supporting wallet creation, balance transfers, and ledger auditing. Enforced race-condition prevention using database-level Pessimistic Locking and Idempotency-Key deduplication.',
      highlights: [
        'Pessimistic Locking (SELECT ... FOR UPDATE) on wallet accounts preventing race conditions under concurrent load.',
        'ACID transactional consistency guaranteed with @Transactional rollback boundaries.',
        'Idempotency-Key HTTP header deduplication to safely prevent double-spend retries.',
        'Validated across 12 automated JUnit 5 concurrency tests and documented with Swagger/OpenAPI UI.'
      ],
      tech: ['Java 17', 'Spring Boot 3', 'MySQL', 'Pessimistic Locking', 'Spring Data JPA', 'JUnit 5', 'Swagger UI'],
      github: 'https://github.com/Rohith-04-04/digital-wallet-backend',
      liveDemo: 'https://digital-wallet-backend-p7cx.onrender.com/swagger-ui/index.html'
    },
    economic: {
      title: 'Economic Freedom Index Analytics Platform',
      image: 'assets/project-economic.svg',
      problem: 'Evaluating international prosperity metrics requires synthesizing complex multi-dimensional indicators across global economies without manual spreadsheet overhead.',
      solution: 'Developed an exploratory data analysis workflow evaluating 12 economic freedom pillars across global economies. Cleaned macroeconomic data with Python & Pandas, and engineered interactive dashboards on Tableau Public.',
      highlights: [
        'Data cleaning, transformation, and outlier analysis of macroeconomic indicators using Python and Pandas.',
        'Interactive Tableau Public dashboards displaying global pillar scores and correlation curves.',
        'Cross-country distribution comparisons analyzing the link between institutional freedom and GDP per capita.'
      ],
      tech: ['Python', 'Pandas', 'Tableau Public', 'Data Cleansing', 'Exploratory Data Analysis'],
      github: 'https://github.com/Rohith-04-04/Measuring-the-pulse-of-Prosperity-an-Index-of-Economic-Freedom-Analysis',
      liveDemo: 'https://public.tableau.com/app/profile/rohith.eli/viz/new_dashboard_17'
    },
    student: {
      title: 'Student Management System — Spring Boot N-Tier Architecture',
      image: 'assets/project-student.svg',
      problem: 'Educational institutions require structured, secure digital record-keeping for student enrollments, course assignments, and academic tracking.',
      solution: 'Built an n-tier Spring Boot backend service during the EduSkills Foundation internship. Developed CRUD operations for student profiles, validated registrations via unique NIC identifiers, and published Postman API documentation.',
      highlights: [
        'Built with Controller-Service-Repository n-tier architecture for modular separation of concerns.',
        'Implemented student registration, profile updates, and course enrollment web services.',
        'Spring Data JPA relational persistence with transactional exception handling.',
        'Documented and verified endpoints using an interactive Postman API Collection.'
      ],
      tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'MySQL', 'Postman', 'RESTful APIs'],
      github: 'https://github.com/Rohith-04-04/Student-Management-System',
      liveDemo: null
    }
  };

  // ============================================================================
  // Skills Click -> Open Small Panel
  // ============================================================================
  const skillDetailPanel = document.getElementById('skillDetailPanel');
  const skillDetailName = document.getElementById('skillDetailName');
  const skillDetailText = document.getElementById('skillDetailText');
  const skillDetailTags = document.getElementById('skillDetailTags');
  const skillDetailClose = document.getElementById('skillDetailClose');

  document.querySelectorAll('.skill-tile, .skill-item').forEach(item => {
    item.addEventListener('click', function () {
      const skillKey = this.getAttribute('data-skill');
      const data = SKILLS_DATA[skillKey];
      if (!data || !skillDetailPanel) return;

      skillDetailName.textContent = data.name;
      skillDetailText.textContent = data.usage;
      skillDetailTags.innerHTML = data.tags.map(t => `<span class="detail-chip">${t}</span>`).join('');
      skillDetailPanel.style.display = 'block';
      skillDetailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  if (skillDetailClose) {
    skillDetailClose.addEventListener('click', () => {
      if (skillDetailPanel) skillDetailPanel.style.display = 'none';
    });
  }

  // ============================================================================
  // Project Cards Click -> Open Modal / Slide-Out
  // ============================================================================
  const projectModal = document.getElementById('projectModal');
  const projModalDimmer = document.getElementById('projModalDimmer');
  const projModalClose = document.getElementById('projModalClose');
  const projModalTitle = document.getElementById('projModalTitle');
  const projModalBody = document.getElementById('projModalBody');
  const projModalFooter = document.getElementById('projModalFooter');

  function openProjectModal(key) {
    const data = PROJECTS_DATA[key];
    if (!data || !projectModal) return;

    projModalTitle.textContent = data.title;

    const highlightsHtml = data.highlights.map(h => `<li>${h}</li>`).join('');
    const techPills = data.tech.map(t => `<span class="tech-badge" style="margin-right:4px;">${t}</span>`).join('');

    projModalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-proj-img">
      <div class="modal-section-title">Problem Statement</div>
      <p style="font-size:0.9rem; line-height:1.6; margin-bottom:0.75rem;">${data.problem}</p>
      
      <div class="modal-section-title">Solution & Architecture</div>
      <p style="font-size:0.9rem; line-height:1.6; margin-bottom:0.75rem;">${data.solution}</p>
      
      <div class="modal-section-title">Key Implementation Highlights</div>
      <ul class="modal-bullet-list">${highlightsHtml}</ul>

      <div class="modal-section-title">Technologies Used</div>
      <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">${techPills}</div>

      <div class="modal-notice">
        ℹ️ <strong>Note:</strong> Live demo links hosted on free-tier cloud platforms (Render) may take approximately 60 seconds to spin up from sleep mode.
      </div>
    `;

    let footerHtml = `
      <button type="button" class="social-btn" id="projModalCloseBtn">Close</button>
      <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="social-btn">
        View on GitHub ↗
      </a>
    `;

    if (data.liveDemo) {
      footerHtml += `
        <a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          Open Live Demo ↗
        </a>
      `;
    }

    projModalFooter.innerHTML = footerHtml;

    const closeBtn = document.getElementById('projModalCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeProjModal);

    projectModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjModal() {
    if (projectModal) {
      projectModal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      const projKey = this.getAttribute('data-proj');
      openProjectModal(projKey);
    });
  });

  if (projModalClose) projModalClose.addEventListener('click', closeProjModal);
  if (projModalDimmer) projModalDimmer.addEventListener('click', closeProjModal);

  // ============================================================================
  // Certificate PDF Viewer Modal
  // ============================================================================
  const certModal = document.getElementById('certModal');
  const certModalDimmer = document.getElementById('certModalDimmer');
  const certModalClose = document.getElementById('certModalClose');
  const certModalTitle = document.getElementById('certModalTitle');
  const certIframe = document.getElementById('certIframe');
  const certDownloadLink = document.getElementById('certDownloadLink');

  function openCertModal(filePath, titleName, credlyUrl) {
    if (!certModal) return;
    certModalTitle.textContent = titleName || 'Certificate Preview';
    if (certIframe) certIframe.src = filePath;
    if (certDownloadLink) {
      certDownloadLink.href = filePath;
      certDownloadLink.setAttribute('download', filePath.split('/').pop());
    }

    // Add Credly link if available
    const footer = document.getElementById('certModalFooter');
    let extraBtns = '';
    if (credlyUrl) {
      extraBtns = `
        <a href="${credlyUrl}" target="_blank" rel="noopener noreferrer" class="social-btn" style="margin-right:auto;">
          Verify on Credly ↗
        </a>
      `;
    }
    if (footer) {
      footer.innerHTML = `
        ${extraBtns}
        <button type="button" class="social-btn" id="certCloseBtn">Close</button>
        <a id="certDownloadLink" href="${filePath}" target="_blank" rel="noopener noreferrer" class="btn-primary" download>
          Open / Download PDF &rarr;
        </a>
      `;
      const cClose = document.getElementById('certCloseBtn');
      if (cClose) cClose.addEventListener('click', closeCertModal);
    }

    certModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('is-active');
      if (certIframe) certIframe.src = '';
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const file = this.getAttribute('data-cert-file');
      const name = this.getAttribute('data-cert-name');
      const credly = this.getAttribute('data-credly');
      if (file) {
        openCertModal(file, name, credly);
      }
    });
  });

  if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
  if (certModalDimmer) certModalDimmer.addEventListener('click', closeCertModal);

  // Close modals on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeProjModal();
      closeCertModal();
    }
  });

  // ============================================================================
  // Mobile Menu Toggle
  // ============================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
      });
    });
  }

  // ============================================================================
  // Copy Email to Clipboard
  // ============================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async function () {
      const email = this.getAttribute('data-copy') || 'rohitheli4444@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.color = '#059669';
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
        }, 2000);
      } catch (err) {
        alert('Email: ' + email);
      }
    });
  }

  // ============================================================================
  // Message Character Counter
  // ============================================================================
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('charCounter');
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', function () {
      charCounter.textContent = `${this.value.length} / 2000`;
    });
  }

  // ============================================================================
  // Contact Form Submission (Spring Boot REST API)
  // ============================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formAlert = document.getElementById('formAlert');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field && errorEl) {
      if (message) {
        field.classList.add('is-invalid');
        errorEl.textContent = message;
      } else {
        field.classList.remove('is-invalid');
        errorEl.textContent = '';
      }
    }
  }

  function clearErrors() {
    setFieldError('senderName', 'nameError', '');
    setFieldError('senderEmail', 'emailError', '');
    setFieldError('subject', 'subjectError', '');
    setFieldError('message', 'messageError', '');
    if (formAlert) {
      formAlert.style.display = 'none';
      formAlert.className = 'form-alert';
      formAlert.textContent = '';
    }
  }

  function showAlert(type, text) {
    if (!formAlert) return;
    formAlert.className = `form-alert ${type}`;
    formAlert.textContent = text;
    formAlert.style.display = 'block';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearErrors();

      const senderName = document.getElementById('senderName').value.trim();
      const senderEmail = document.getElementById('senderEmail').value.trim();
      const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
      const subject = document.getElementById('subject').value.trim();
      const rawMessage = document.getElementById('message').value.trim();
      const honeypot = document.getElementById('formWebsite').value.trim();

      // Bot honeypot protection
      if (honeypot.length > 0) {
        showAlert('success', 'Thank you! Your message has been sent successfully.');
        contactForm.reset();
        return;
      }

      let hasError = false;
      if (!senderName || senderName.length < 2) {
        setFieldError('senderName', 'nameError', 'Please enter your name.');
        hasError = true;
      }

      if (!senderEmail || !isValidEmail(senderEmail)) {
        setFieldError('senderEmail', 'emailError', 'Please enter a valid email address.');
        hasError = true;
      }

      if (!subject || subject.length < 3) {
        setFieldError('subject', 'subjectError', 'Please enter a subject (min 3 chars).');
        hasError = true;
      }

      if (!rawMessage || rawMessage.length < 10) {
        setFieldError('message', 'messageError', 'Please enter your message (min 10 chars).');
        hasError = true;
      }

      if (hasError) return;

      // Append optional phone to message if provided
      let fullMessage = rawMessage;
      if (phone) {
        fullMessage += `\n\n[Contact Phone: ${phone}]`;
      }

      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Submitting...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';

      try {
        const response = await fetch(CONTACT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senderName,
            senderEmail,
            subject,
            message: fullMessage,
            honeypot: ''
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          showAlert('success', data.message || 'Thank you! Your message has been delivered to Eli Rohith Sri Ganesh.');
          contactForm.reset();
          if (charCounter) charCounter.textContent = '0 / 2000';
        } else if (response.status === 400 && data.fieldErrors) {
          for (const [field, errorMsg] of Object.entries(data.fieldErrors)) {
            if (field === 'senderName') setFieldError('senderName', 'nameError', errorMsg);
            if (field === 'senderEmail') setFieldError('senderEmail', 'emailError', errorMsg);
            if (field === 'subject') setFieldError('subject', 'subjectError', errorMsg);
            if (field === 'message') setFieldError('message', 'messageError', errorMsg);
          }
          showAlert('error', data.message || 'Please correct the highlighted errors.');
        } else {
          showAlert('error', data.message || 'Unable to deliver message at this time.');
        }
      } catch (err) {
        console.error('Contact error:', err);
        showAlert('error', 'Notice: Backend server is offline or connecting. You can also contact directly at rohitheli4444@gmail.com.');
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Submit Message';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }
})();
