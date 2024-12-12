import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import {getEmail, getAuthToken } from '../../../../service/serviceMethods';

export const Header = () => {
    // Eventually replace this with the role check
    const userRole = "User";
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const fetchEmail = async () => {
            const email = await getEmail();
            setUserEmail(email);
        }
        fetchEmail();
    }, []);

    const handleLogout = async () => {
        console.log("LOGOUT");
        try {
            const token = await getAuthToken();
            console.log(token);
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            const data = await response.json();
            if (data.success) {
                // Handle successful logout (e.g., redirect to login page)
                setUserEmail(null);  // Clear the user email state
                console.log("Logged out successfully");
                console.log('HERE');
                sessionStorage.setItem('authToken', null);
                sessionStorage.setItem('userName', null);

            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    
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
                {userEmail ? (
                    <button onClick={handleLogout}>Logout</button>  // If email is set, show Logout button
                ) : (
                    <NavLink to="/login">Login</NavLink>  // If no email, show Login button
                )}
            </div>
            <nav>
                {navItems()}
            </nav>
        </header>
    )
}