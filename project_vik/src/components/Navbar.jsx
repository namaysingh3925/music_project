import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
            <NavLink to="/signin" className={({ isActive }) => isActive ? "active" : ""}>Sign In</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Log In</NavLink>
        </nav>
    );
};

export default Navbar;