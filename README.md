# 🩸 BloodConnect — Blood Donation Application

A full-featured **Blood Donation Management Platform** built with the **MERN stack** to connect blood donors, volunteers, and administrators with people in need of blood. The application focuses on usability, role-based access control, secure authentication, and a clean, user-friendly UI.

---

## 🌐 Live Demo

👉 **[https://bloodconnect-c5814.web.app](https://bloodconnect-c5814.web.app)**

---

## 🎯 Project Purpose

BloodConnect aims to simplify and digitalize blood donation activities by:

- Connecting donors with recipients efficiently
- Managing blood donation requests transparently
- Providing role-based dashboards for Admin, Donor, and Volunteer
- Ensuring secure authentication and protected APIs

---

## 👥 User Roles & Permissions

### 🧑‍💼 Admin

- Manage all users (block / unblock)
- Change user roles (Donor → Volunteer → Admin)
- View & manage all blood donation requests
- View platform statistics (users, requests, funds)

### 🩸 Donor

- Register & manage profile
- Create blood donation requests
- View, edit, delete own requests
- Track donation status (pending → in progress → done / canceled)

### 🤝 Volunteer

- View all blood donation requests
- Update donation status only
- Restricted from deleting or editing requests

---

## 🔐 Authentication & Security

- Email & Password authentication using **Firebase Auth**
- Role-based route protection (Private & Admin routes)
- Firebase & MongoDB credentials secured via **environment variables**
- Reload-safe routing (no redirect to login on refresh)

---

## 🧭 Core Features

### ✅ Public Features

- Home page with banner, featured sections, and contact form
- About Us section explaining the mission and purpose of BloodConnect
- Search donors by blood group, district & upazila
- View all pending blood donation requests

- Responsive navbar & footer

### 🔒 Private Dashboard Features

- Responsive sidebar-based dashboard
- Profile management with edit/save mode
- Donation request management (CRUD)
- Pagination & filtering for large datasets
- Charts & statistics for quick insights

### 📄 Extra Features

- Download donor search results as **PDF**
- Animated UI using **Framer Motion**
- SweetAlert confirmation modals
- Fully responsive for mobile, tablet & desktop

---

## 🧱 Tech Stack

### Frontend

- **React 19** + **Vite**
- **React Router v7**
- **Tailwind CSS v4** + DaisyUI
- **TanStack React Query**
- **Axios**
- **Firebase Authentication**
- **Framer Motion** (animations)
- **Recharts** (charts & graphs)
- **jsPDF & jsPDF-AutoTable** (PDF download)

### Backend (Server)

- Node.js
- Express.js
- MongoDB
- CORS & Environment-based config

---

## 📦 NPM Packages Used (Client)

```json
react
react-router
@tanstack/react-query
axios
firebase
tailwindcss
daisyui
framer-motion
jspdf
jspdf-autotable
recharts
sweetalert2
react-hook-form
react-icons
react-spinners
swiper
```

---

## 🧩 Project Structure (Client)

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── dashboard/
│   ├── hooks/
│   ├── routes/
│   ├── services/
│   ├── assets/
│   └── main.jsx
├── public/
├── .env
├── index.html
└── vite.config.js
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Takdirul-Rijan/blood-donor-network-client.git

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 🚀 Deployment

- Frontend deployed on **Firebase Hosting**
- Backend deployed on **Vercel**
- Firebase domain whitelisted for authentication

---

## 🧑‍💻 Author

**Md. Takdirul Islam Rijan**
📍 Dhaka, Bangladesh

- 🔗 GitHub: [https://github.com/Takdirul-Rijan](https://github.com/Takdirul-Rijan)
- 📧 Email: [takdirul.rijan@gmail.com](mailto:takdirul.rijan@gmail.com)
- 📱 WhatsApp: +8801624375159

---

If you like this project, feel free to ⭐ the repository!

---

**BloodConnect — Donate Blood, Save Lives 🩸**
