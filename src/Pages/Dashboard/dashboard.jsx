import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";
import './tabs.css';

function Dashboard() {
    const [activeTab, setActiveTab] = useState("Appointments");
    const [appointments, setAppointments] = useState([]);
    const [month, setMonth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (activeTab === 'Appointments') {
            fetchAppointments();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'Contracts') {
            loadAdobeSDK();
        }
    }, [activeTab]);

    const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/appointments?who=user123'); // Replace 'user123' with dynamic user identifier if needed
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            setMonth(data.appointments[0].month || null);
            setAppointments(data.appointments[0].days || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadAdobeSDK = () => {
        // Check if Adobe SDK script is already present
        const existingScript = document.querySelector('script[src="https://acrobatservices.adobe.com/view-sdk/viewer.js"]');
        
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://acrobatservices.adobe.com/view-sdk/viewer.js";
            script.async = true;
            script.onload = () => {
                if (window.AdobeDC) {
                    const adobeDCView = new window.AdobeDC.View({
                        clientId: "ab3c1957c91e487684787934eb44698b",
                        divId: "adobe-dc-view",
                    });
                    adobeDCView.previewFile(
                        {
                            content: {
                                location: {
                                    url: "https://acrobatservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf", // Replace with dynamic PDF URL
                                },
                            },
                            metaData: { fileName: "Bodea Brochure.pdf" },
                        },
                        { embedMode: "SIZED_CONTAINER" }
                    );
                }
            };
            document.body.appendChild(script);
        }
    };
    

    const renderContent = () => {
        if (activeTab === 'Appointments') {
            return (
                <div className="tabs-content">
                    <h2 className="header-text">Appointments</h2>
                    <h3>Your Appointments can be changed on the Calendar Page</h3>
                    {loading ? (
                        <p>Loading appointments...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : Object.keys(appointments).length > 0 ? (
                        <ul>
                            {Object.entries(appointments).map(([day, details]) => (
                                <li key={day}>
                                    <strong>Month {month} Day {day}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            );
        } else if (activeTab === 'Contracts') {
            return (
                <div className="tabs-content">
                    <h2 className="header-text">Contracts</h2>
                    <h3>Your Contract</h3>
                    <div id="adobe-dc-view" style={{ height: "360px", width: "500px" }}></div>
                </div>
            );
        } else if (activeTab === "Profile") {
            return (
                <div className="tabs-content">
                    <main>
                        <h2 className="header-text">Profile Settings</h2>
                        <form action="/update-profile" method="POST">
                            <label htmlFor="email">Email:</label>
                            {/* <input type="email" id="email" name="email" value={userEmail} onChange={handleEmailChange} /> */}
                            <label htmlFor="password">New Password:</label>
                            {/*<input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} /> */}
                            <button type="submit">Update Profile</button>
                            <p>Will be updated with actual data when I connect the database</p>
                        </form>
                    </main>
                </div>
            );
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <div className="data-view">
                <nav className="tabs-nav">
                    <button
                        className={activeTab === 'Appointments' ? 'active' : ''}
                        onClick={() => setActiveTab('Appointments')}
                    >
                        Appointments
                    </button>
                    <button
                        className={activeTab === 'Contracts' ? 'active' : ''}
                        onClick={() => setActiveTab('Contracts')}
                    >
                        Contracts
                    </button>
                    <button
                        className={activeTab === 'Profile' ? 'active' : ''}
                        onClick={() => setActiveTab('Profile')}
                    >
                        Profile
                    </button>
                </nav>
                <main>{renderContent()}</main>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;