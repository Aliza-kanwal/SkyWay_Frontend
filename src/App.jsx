import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/admin/AdminRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ChatBot from './components/common/ChatBot';
import LandingPage from './pages/user/LandingPage';
import SearchResultsPage from './pages/user/SearchResultsPage';
import FlightDetailsPage from './pages/user/FlightDetailsPage';
import BookingPage from './pages/user/BookingPage';
import BookingConfirmationPage from './pages/user/BookingConfirmationPage';
import MyBookingsPage from './pages/user/MyBookingsPage';
import ProfilePage from './pages/user/ProfilePage';
import AboutPage from './pages/user/AboutPage';
//import DealsPage from './pages/user/DealsPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';

// Admin imports
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageFlightsPage from './pages/admin/ManageFlightsPage';
import ManageAirportsPage from './pages/admin/ManageAirportsPage';
import ManageBookingsPage from './pages/admin/ManageBookingsPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import './index.css';

// Wrapper component to conditionally show Navbar/Footer
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/flight/:id" element={<FlightDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Protected User Routes */}
          <Route path="/booking/:flightId" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
          <Route path="/booking-confirmation" element={<PrivateRoute><BookingConfirmationPage /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookingsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/flights" element={<AdminRoute><ManageFlightsPage /></AdminRoute>} />
          <Route path="/admin/airports" element={<AdminRoute><ManageAirportsPage /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><ManageBookingsPage /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><ManageUsersPage /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AnalyticsPage /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><SettingsPage /></AdminRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ChatBot />}
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;