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
                        <li><a href="Pages/home.html">Home</a></li>
                        <li><a href="Pages/dashboard.html"></a>Dashboard</li>
                    </ul>
                )
            default:
                return (
                    <ul>
                        <li><a href="Pages/home.html">Home</a></li>
                        <li><a href="Pages/calendar.html">Calendar</a></li>
                    </ul>
                )
        }
    }


    return (
        <header>
            <h1>
                <img src="../Pictures/CozyMae_FullLogo.png" alt="CozyMae Floral" width="200" height="84" />
                <span class="image-alt">CozyMae Floral</span>
            </h1>
            <div class="auth-button">
                <a href="Pages/login.html">Login/Register</a>
            </div>
            <nav>
                {navItems()}
            </nav>
        </header>
    )
}