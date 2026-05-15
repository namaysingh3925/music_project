import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/aboutus";
import Contact from "./pages/contact";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login";
import Signin from "./pages/sigin";
import Footer from "./components/Footer";
import { getAccessToken } from "./spotify";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      getAccessToken(code)
        .then((newToken) => {
          setToken(newToken);
          // FIX: was "token", must be "spotifyToken" to match spotify.js
          window.localStorage.setItem("spotifyToken", newToken);
          window.history.pushState({}, null, "/");
        })
        .catch((err) => console.error("Error exchanging code for token", err));
    } else {
      // FIX: was "token", must be "spotifyToken" to match spotify.js
      const savedToken = window.localStorage.getItem("spotifyToken");
      if (savedToken) setToken(savedToken);
    }
  }, []);

  return (
    <AuthProvider>
      <PlayerProvider>
        <div className="app-container">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="main-layout">
            <Sidebar />
            <main className="content-area">
              <Routes>
                <Route path="/" element={<Home token={token} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<Signin />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;