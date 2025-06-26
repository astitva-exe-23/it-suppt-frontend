# 🛠️ IT Support Ticketing System

A full-stack role-based IT support platform with user, support, and admin functionality — built with **React**, **Node.js**, **MongoDB**, and integrated with **Gemini API** (Google Generative AI) for intelligent ticket suggestions.


---

## 🚀 Features

### 👥 Role-Based Access
- **User**: Create and view tickets with AI-suggested solutions.
- **Support Staff**: Self-assign, track, and resolve tickets.
- **Admin**: Register support users and monitor support performance.

### 💡 Smart Ticket Suggestions
- Uses **Gemini AI** to provide real-time suggestions for user-submitted issues.

### 🔐 Authentication & Authorization
- JWT-based login with secure HTTP-only cookies.
- Role-based route protection on both backend and frontend.

### 💻 Technologies
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB Atlas
- **AI Integration**: Google Gemini API

---

## 🌐 Live Demo

- **Frontend**: [View Deployed Site](https://your-frontend-url.com)
- **Backend API**: [Backend on Render](https://your-backend-url.com)
---

## 🧠 Gemini Integration

The system sends ticket details to [Google’s Gemini API](https://ai.google.dev/) and receives intelligent suggestions that are shown in the user's ticket log.

---

## 📦 Folder Structure

```bash
📁 backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
📁 frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
