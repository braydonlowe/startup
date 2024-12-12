import React from "react";
import { useNavigate } from "react-router-dom";
import "../login_register.css";

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior.

        const formData = new FormData(event.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Handle non-200 responses
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
                return;
            }

            const result = await response.json();
            console.log('Registration successful:', result);

            // Redirect to the login page or dashboard
            alert("Registration successful! You can now log in.");
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="screen">
            <div className="wrapper">
                <main>
                    <div className="auth-container">
                        <div className="logo-top">
                            <a href="/">
                                <img
                                    src="../Pictures/CozyMae_FullLogo.png"
                                    alt="CozyMae Floral"
                                    width="200"
                                    height="84"
                                />
                            </a>
                        </div>
                        <div className="labels">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />

                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" required />

                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required />

                                <button id="loginButton" type="submit">Register</button>
                            </form>
                        </div>
                        <div className="logo-bottom">
                            <img
                                src="../Pictures/CozyMae_LogoSubmark.png"
                                alt="CozyMae Submark"
                                width="90"
                                height="50"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Register;
