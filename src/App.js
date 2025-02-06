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
  const { currentUser } = useAuth(); // Get user from AuthContext
  return currentUser ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <div className="App">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/recipes/:id" element={<RecipePage />} />
                </Routes>
              </div>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


