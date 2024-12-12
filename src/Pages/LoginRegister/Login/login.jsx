import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../login_register.css";


export const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Unknown Error'}`);
                return;
            }

            const result = await response.json();
            console.log('Login successful:', result);

            if (result.token) {
                console.log("TOKEN");
                console.log(result.token)
                sessionStorage.setItem('authToken', result.token);
                sessionStorage.setItem('userName', formData.get("email"));
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="screen">
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
                        <form onSubmit={handleSubmit} action="/api/auth/login" method="POST">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />
                            <button type="submit" id="loginButton">Login</button>
                        </form>
                    </div>
                   
                    <p>
                    Don't have an account? <NavLink to="/register">Register Here</NavLink>
                    </p>
                    <div className="logo-bottom">
                    <img src="../Pictures/CozyMae_LogoSubmark.png" width="90" height="50" alt="Submark" />
                    </div>
                </div>
            </main>


        </div>
        
        

            

    );
  };

export default Login;