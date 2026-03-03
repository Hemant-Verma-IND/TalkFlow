<div align="center">

# 🛡️ TalkFlow

### 🔐 Secure Communication Archival System

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=2500&pause=800&color=00F5FF&center=true&vCenter=true&width=700&lines=Encryption+First+Architecture;AES-256+Encrypted+Vault;JWT+%2B+HttpOnly+Security;Visualising+Unstructured+Data;Built+with+Security+Engineering+Principles" />

<br/>

[![Frontend Preview](./frontend/image.png)](https://talkflow-iota.vercel.app/)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_TalkFlow-0A192F?style=for-the-badge\&logo=vercel\&logoColor=white)](https://talkflow-iota.vercel.app/)
[![Security](https://img.shields.io/badge/Security-AES--256--CBC-1F4068?style=for-the-badge\&logo=shield\&logoColor=white)]


</div>

---

## ⚡ Overview

> **TalkFlow** is a security-first encrypted vault engineered to transform raw chat exports into a structured, searchable, and premium visual archive.

Traditional chat backups are:

* ❌ Plain text by default
* ❌ Difficult to analyse
* ❌ Insecure at rest

TalkFlow addresses these challenges through strong encryption, hardened authentication, and intelligent parsing.

---

## 🔐 Security Architecture

### 🧩 Encryption at Rest

* AES-256-CBC encryption before database persistence
* Encryption keys stored in environment variables
* Decryption only within authenticated controller layer

### 🔑 Stateless Authentication

* JWT stored in **HttpOnly Secure Cookies**
* Bcrypt hashing with strong salt rounds
* No LocalStorage token storage

### 🛡️ Backend Hardening

* Helmet.js secure HTTP headers
* Rate limiting on authentication and upload routes
* Input sanitisation to prevent NoSQL injection
* Secure file streaming with Multer

---

## 🧠 Intelligent Parsing Engine

* Regex detection for iOS & Android chat formats
* Multi-line message reconstruction
* System message classification
* Scroll-based calendar synchronisation
* Instant smart search across large datasets

---

## 🎨 Premium UI/UX

* Glassmorphism dark interface
* WebGL animated “Light Rays” background (OGL)
* Framer Motion transitions
* Fully responsive design

---

## 🛠️ Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React.js, OGL (WebGL), Framer Motion, Lucide |
| Backend  | Node.js, Express.js                          |
| Database | MongoDB (Mongoose ORM)                       |
| Security | AES-256, Bcrypt, JWT, Helmet, Rate-Limit     |
| Styling  | Pure CSS3 (Variables, Flexbox, Grid)         |

---

## 🏗️ Engineering Philosophy

```
Assume Breach.
Encrypt by Default.
Minimise Attack Surface.
Visualise Intelligently.
```

TalkFlow demonstrates:

* Secure backend architecture
* Stateless authentication implementation
* Encryption lifecycle management
* Efficient handling of unstructured communication logs
* Production-grade API hardening

---

## 🚀 Local Setup

```bash
# Clone repository
git clone https://github.com/your-username/talkflow.git

# Install dependencies
npm install

# Configure environment variables
MONGO_URI=
JWT_SECRET=
ENCRYPTION_KEY=

# Start development server
npm run dev
```

---

<div align="center">

### 🔐 Secure. Structured. Sovereign.

</div>
