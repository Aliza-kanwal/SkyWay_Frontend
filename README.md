# ✈️ SkyWay Airlines — Frontend

A full-featured airline reservation system built with React.js, connected to a Node.js/Express backend with MySQL database.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Framer Motion
- **API calls:** Axios
- **Routing:** React Router v6
- **Notifications:** React Hot Toast
- **Icons:** React Icons

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Aliza-kanwal/Skyway_FrontendE.git
cd Skyway_Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your `.env` file
Create a `.env` file in the root folder and add:
REACT_APP_API_URL=http://localhost:5000/api

### 4. Make sure backend is running
The backend must be running on port 5000 before starting the frontend.
Ask your backend teammate for the backend repo and setup instructions.

### 5. Start the frontend
```bash
npm start
```

Frontend will run on `http://localhost:3001`
---

## 🗂️ Project Structure
src/
├── components/
│   ├── common/          # Navbar, Footer, ChatBot
│   ├── flights/         # FlightCard, FlightSearchForm
│   └── ui/              # Reusable UI components
├── context/             # AuthContext
├── hooks/               # Custom hooks
├── pages/
│   ├── user/            # Landing, Search, Booking, Profile pages
│   └── admin/           # Admin dashboard pages
└── services/
└── api/             # All API calls (flights, bookings, airports)
---

## 📱 Features

- 🔍 Search flights by route and date
- ✈️ View flight details and select seats
- 📋 Book flights (login required)
- ❌ Cancel bookings
- 👤 User profile with booking history
- 🤖 AI chatbot for travel assistance
- 🛡️ Admin panel for managing flights, airports & bookings
- 📱 Fully responsive design

---

## 🔗 API Endpoints Used

| Feature | Endpoint |
|---|---|
| Search flights | `GET /api/flights/search` |
| Get airports | `GET /api/airports` |
| Login | `POST /api/auth/login` |
| Register | `POST /api/auth/register` |
| My bookings | `GET /api/bookings/my` |
| Create booking | `POST /api/bookings` |
| Cancel booking | `PUT /api/bookings/:id/cancel` |
| Admin bookings | `GET /api/admin/bookings` |

---

## 👥 Team

- **Frontend:** [Aliza Kanwal]
- **Backend:** [Emaan Arif Khan]
- **DB Architect:** [Sameen Ali]
- **QA LEAD:** [Masooma Abidi]

---

## 📝 Notes

- Make sure MySQL is running before starting the backend
- Default backend port is `5000`
- Default frontend port is `3001`
- Admin panel accessible at `/admin/login`