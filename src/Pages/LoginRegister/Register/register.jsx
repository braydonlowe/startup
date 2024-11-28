import React from "react";
import "../login_register.css"

const Register = () => {
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
                <form action="/register" method="POST">
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