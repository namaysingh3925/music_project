import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/aboutus";
import Contact from "./pages/contact";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login";
import Signin from "./pages/sigin";
import Footer from "./components/Footer";
import './App.css'; 

function App() {
  return (
    <div className="app-container">


      <div className="navbar">
        <Navbar />
      </div>


      <div className="main-layout">


        <Sidebar />


        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </main>

      </div>


      <Footer />
    </div>
  );
}

export default App;