import React, { useState } from "react";
import { Header } from "../Components/Header/Header"
import { Footer } from "../Components/Footer/Footer"
import './tabs.css'



function Dashboard() {
    const [activeTab, setActiveTab] = useState("Appointments");

    const renderContent = () => {
        if (activeTab === 'Appointments') {
            return (
                <div className="tabs-content">
                    <h2 className="header-text">Appointments</h2>
                    <h3>Manage Your Appointments</h3>
                    <ul>
                        <li>Appointment 1: [Date & Time]</li>
                        <li>Appointment 2: [Date & Time]</li>
                        // Will be updated with WEBSOCKET
                     </ul>
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