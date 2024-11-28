import React from "react";
import "../login_register.css";
import "../../../CSS/shared.css";

export const Login = () => {
    return (
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
            <form action="/login" method="POST">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
  
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
  
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <a href="/register">Register here</a>
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