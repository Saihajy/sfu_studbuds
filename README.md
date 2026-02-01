# 🎓 StudBuds — SFU Study Group Finder

StudBuds is a web application designed to help SFU students find compatible study partners based on courses, program, year, and study availability. 

Built during a hackathon to demonstrate full-stack development, API integration, and user-focused design.

---

## 🚀 Features

- **User Authentication:** Registration and login via session-based authentication.
- **Profile Management:** Manage personal info, courses, and availability.
- **Course Validation:** Integrated SFU course outline validation.
- **Discovery:** Real-time study group discovery.
- **Data Persistence:** Persistent user data with MongoDB.
- **Retro UI:** Unique Windows-95 inspired design.

---

## 🛠 Tech Stack

### Frontend
- HTML / CSS / JavaScript
- Served through Spring Boot static resources

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Session-based authentication

### Other
- Spring Boot (Java)
- Maven

---

## 🏗 Project Architecture

This project uses **two servers** running simultaneously:

| Server | Purpose | Port |
| :--- | :--- | :--- |
| **Spring Boot** | Serves frontend pages | 8080 |
| **Node.js** | Authentication & Database API | 3000 |

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18+)
- Java 17+
- MongoDB (Local or MongoDB Atlas)

### 1. Start MongoDB
If running locally:
$ mongod

### 2. Start Node Backend
$cd schema/server_routes$ npm install
$ npm start
(API runs at: http://localhost:3000)

### 3. Start Spring Boot Frontend
From the project root:

# macOS/Linux:
$ ./mvnw spring-boot:run

# Windows:
$ mvnw.cmd spring-boot:run
(Frontend available at: http://localhost:8080/index.html)

---

## 🎞 Demo
The Devpost demo video covers:
- User registration & login
- Dashboard navigation
- Profile updates & data persistence
- Study group discovery

---

## ⚖️ Notes for Judges
- **Sessions:** Uses cookie-based session management.
- **Dual Servers:** Both servers must be running for the app to function.
- **Routing:** All frontend pages are served through Spring Boot.

---

**Team StudBuds** | *Hackathon Project 2026*