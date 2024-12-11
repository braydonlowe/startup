import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header/Header"
import { Footer } from "../Components/Footer/Footer"
import './tabs.css'



function Dashboard() {
    const [activeTab, setActiveTab] = useState("Appointments");
    const [appointments, setAppointments] = useState([]);
    const [month, setMonth] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (activeTab === 'Appointments') {
            fetchAppointments();
        }
    }, [activeTab]);


    const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/appointments?who=user123'); // Replace 'user123' with dynamic user identifier if needed.
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            setMonth(data.appointments[0].month);
            console.log(data);
            setAppointments(data.appointments[0].days || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (activeTab === 'Appointments') {
            return (
                <div className="tabs-content">
                    <h2 className="header-text">Appointments</h2>
                    <h3>Your Appointments can be changed on the Calandar Page</h3>
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
                    <h3>Your Contracts</h3>
                    <ul>
                        <li>Contract 1: <a href="contract1.pdf" target="_blank">View</a></li>
                        <li>Contract 2: <a href="contract2.pdf" target="_blank">View</a></li>
                        //Contracts are stored in the database
                    </ul>
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
                            {/*<input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
 */}
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
    )
}


export default Dashboard;