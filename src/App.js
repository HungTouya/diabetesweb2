import React from "react";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Navbar from "./components/Navbar";  
import Home from "./pages/Home";         // Placeholder for home page  
import Menu from "./pages/Menu";         // Menu page to display all recipes  
import Schedule from "./pages/Schedule"; // Placeholder for schedule page  
import Profile from "./pages/Profile";    // Placeholder for profile page  
import RecipePage from "./pages/RecipePage"; // Individual recipe detail page  
import "./App.css";  

function App() {  
  return (  
    <Router>  
      <div className="App">  
        <Navbar />  
        <Routes>  
          <Route path="/" element={<Home />} />  
          <Route path="/menu" element={<Menu />} /> {/* Menu Showing All Recipes */}  
          <Route path="/schedule" element={<Schedule />} />  
          <Route path="/profile" element={<Profile />} />  
          <Route path="/recipes/:id" element={<RecipePage />} /> {/* Individual Recipe Detail */}  
        </Routes>  
      </div>  
    </Router>  
  );  
}  

export default App;

