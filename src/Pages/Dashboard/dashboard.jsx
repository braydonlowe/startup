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
                    <h2>Appointments</h2>
                    <p>Here you can manage your appointments</p>
                </div>
            );
        } else if (activeTab === 'Contracts') {
            return (
                <div className="tabs-content">
                    <h2>Contracts</h2>
                    <p>Here you can manage your contracts.</p>
                    {/* Add more contracts-related content here */}
                </div>
            );
        } else if (activeTab == "Profile") {
            return (
                <div className="tabs-content">
                    <h2>Profile</h2>
                </div>
            )
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <div class="data-view">
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