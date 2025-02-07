import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import Auth Context
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import RecipePage from "./pages/RecipePage";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./App.css";

function RequireAuth({ children }) {
  const { user } = useAuth(); // Use "user" instead of "currentUser"
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {user && <Navbar />} {/* Show Navbar only if logged in */}
      <Routes>
        {/* Redirect root to Home or Login based on auth status */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/menu"
          element={
            <RequireAuth>
              <Menu />
            </RequireAuth>
          }
        />
        <Route
          path="/schedule"
          element={
            <RequireAuth>
              <Schedule />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <RequireAuth>
              <RecipePage />
            </RequireAuth>
          }
        />

        {/* Redirect unknown routes to Home if logged in, else Login */}
        <Route path="*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;



