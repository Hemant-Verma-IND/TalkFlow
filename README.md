# 🛡️ TalkFlow - Secure Communication Archival System

> **A premium, encrypted vault for visualizing and archiving sensitive communication streams.**

https://talkflow-iota.vercel.app/

## 🚀 Motivation & Philosophy

In the digital age, our most valuable data often lives in unstructured, ephemeral formats. Standard chat exports (like `.txt` files) are **insecure by default**—stored in plain text, difficult to navigate, and impossible to analyze effectively.

I developed **TalkFlow** to solve three specific engineering challenges:

1.  **Data Sovereignty:** Giving users a self-hosted environment to own their communication history without relying on third-party cloud backups.
2.  **Encryption at Rest:** Ensuring that raw text data is transformed into cyphertext before it ever touches the database, protecting it even in the event of a database compromise.
3.  **Visualization of Unstructured Data:** transforming chaotic raw text logs into a structured, searchable, and premium "Chat UI" experience.

TalkFlow is not just a viewer; it is a **security-first engineering project** demonstrating how to handle sensitive user data responsibly.

---

## 🔐 Security Engineering Architecture

Security was the primary driver for every architectural decision in TalkFlow.

### 1. AES-256 Encryption Strategy
*   **At Rest:** Message content is encrypted using **AES-256-CBC** before storage.
*   **On Flight:** Data is decrypted only upon request by the authenticated user in the controller layer before being sent to the client.
*   **Key Management:** Encryption keys are managed via environment variables, ensuring they are never hardcoded into the codebase.

### 2. Stateless Authentication (JWT + HttpOnly)
*   We moved away from LocalStorage for JWT storage to prevent **XSS (Cross-Site Scripting)** attacks.
*   Tokens are stored in **HttpOnly, Secure Cookies**, making them inaccessible to client-side JavaScript.
*   Passwords are hashed using **Bcrypt** with high salt rounds before persistence.

### 3. Attack Surface Reduction
*   **Helmet.js** is implemented to set secure HTTP headers (HSTS, X-Frame-Options).
*   **Rate Limiting** is applied to Auth and Upload routes to prevent Brute Force and DDoS attempts.
*   **Input Sanitization** prevents NoSQL Injection attacks.

---

## ✨ Key Features

### 🎨 Premium UI/UX
*   **Glassmorphism Aesthetic:** A modern, deep-dark interface built with CSS variables and backdrop filters.
*   **WebGL Backgrounds:** Custom OGL-based "Light Rays" animation for an immersive login experience.
*   **Responsive Design:** Fully fluid layout that works across devices.

### 🧠 Intelligent Parsing Engine
*   **Regex Pattern Matching:** Custom parser detects date formats (iOS/Android variants), system messages, and multi-line text blocks.
*   **Scroll Spy & Calendar:** Dynamic date detection that updates the header calendar as you scroll through years of history.
*   **Smart Search:** Instant frontend filtering of thousands of messages.

### 🛠️ Data Management
*   **Secure Upload:** Multer-based stream processing for large text files.
*   **CRUD Operations:** Rename and securely delete archives (including cascading deletion of encrypted entries).

---

## 💻 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React.js, Lucide Icons, OGL (WebGL), Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ORM) |
| **Security** | Bcrypt, Crypto (Node Native), Helmet, Rate-Limit, JWT |
| **Styling** | Pure CSS3 (Variables + Flexbox/Grid) |

---
