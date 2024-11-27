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
        }
    };

    return (
        <div className="wrapper">
            <Header />

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
                </nav>

                <main>{renderContent()}</main>



            <Footer />
        </div>
    )
}


export default Dashboard;