import React from "react";
import { NavLink } from 'react-router-dom';

export const Header = () => {
    // Eventually replace this with the role check
    const userRole = "User";

    
    const navItems = () => {
        switch (userRole) {
            case "User":
                return (
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/calendar">Calendar</NavLink></li>
                    </ul>
                )
            case "Admin":
                return (
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/calendar">Calendar</NavLink></li>
                    </ul>
                )
            default:
                return (
                    <ul>
                        <li><a href="Pages/home.html">Home</a></li>
                        <li><NavLink to="/calendar">Calendar</NavLink></li>
                    </ul>
                )
        }
    }


    return (
        <header>
            <h1>
                <NavLink to="/">
                    <img id="logo" src="../Pictures/CozyMae_FullLogo.png" alt="CozyMae Floral" width="200" height="84" />
                    <span className="image-alt">CozyMae Floral</span>
                </NavLink>
            </h1>
            <div className="auth-button">
                <NavLink to="/login">Login</NavLink>
            </div>
            <nav>
                {navItems()}
            </nav>
        </header>
    )
}