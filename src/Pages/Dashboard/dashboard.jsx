import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer/Footer";
import { getEmail } from "../../../service/serviceMethods";
import './tabs.css';

function Dashboard() {
    const [activeTab, setActiveTab] = useState("Appointments");
    const [appointments, setAppointments] = useState([]);
    const [month, setMonth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [joke, setJoke] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const fetchEmail = async () => {
            const email = await getEmail();
            setUserEmail(email);
        }
        fetchEmail();
    });

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
            const response = await fetch(`/api/appointments?who=${userEmail}`);
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            const data = await response.json();
            console.log(data.appointments[0].days);
            console.log(userEmail);
            setMonth(data.appointments[0].month || null);
            //Iterate over each thing to make sure it's by my user

            const filteredAppointments = Object.entries(data.appointments[0].days)
                .filter(([day, appointment]) => appointment.updatedBy === userEmail)
                .map(([day, appointment]) => ({ day, ...appointment }));

            console.log(filteredAppointments)
            setAppointments(filteredAppointments);
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
    

    const fetchJoke = async () => {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random?category=dev');
            if (!response.ok) {
                throw new Error('Failed to fetch Norris');
            }
            const data = await response.json();
            setJoke(data.value);
        } catch (err) {
            console.error('Error fetching joke:', err);
        }
    };

    useEffect(() => {
        fetchJoke(); // Fetch a joke on initial render
      }, []);



    const renderContent = () => {
        if (activeTab === 'Appointments') {
            return (
                <div className="tabs-content">
                    <h2 className="header-text">Appointments</h2>
                    <h3>Your Appointments can be changed on the Calendar Page</h3>
                    {loading ? (
                        <p>Loading appointments...</p>
                    ) : Object.keys(appointments).length > 0 ? (
                        <ul>
                            {Object.entries(appointments).map(([day, details]) => (
                                <li key={day}>
                                    <strong>Month {month} Day {details.day}</strong>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No appointments found.</p>
                    )}
                    <h3>Chuck Norris Jokes Backup for Points</h3>
                    {joke && <p>{joke}</p>} {/* Display the fetched joke if available */}

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
                            <p>{userEmail ? userEmail : "Email not available"}</p> {/* Display the email or a fallback message */}
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