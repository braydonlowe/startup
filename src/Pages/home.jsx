import React from "react";

export const Home = () => {
  return (
    <div className="wrapper">
      <header>
        <h1>
          <img
            src="../Pictures/CozyMae_FullLogo.png"
            alt="CozyMae Floral"
            width="200"
            height="84"
          />
          <span className="image-alt">CozyMae Floral</span>
        </h1>
        <div className="auth-button">
          <a href="/login">Login/Register</a>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/calendar">Calendar</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/contracts">Contracts</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2 className="header-text">Welcome to CozyMae Floral!</h2>
          <img
            src="../Pictures/flowerHome.jpg"
            alt="A beautiful flower"
            width="600"
            height="400"
          />
          <p className="paragraph">
          At CozyMae Floral, we specialize in personal, handcrafted arrangements that not only suit the occasion but also embody your vision. Unlike many companies that rely on templates and a 'cookie-cutter' process, we focus on creating unique and heartfelt designs that bring warmth and individuality to every event. It’s not just about selling flowers; it’s about delivering a personal touch that makes each moment unforgettable.
          </p>
        </section>
        <section>
          <h2>GitHub Repo</h2>
          <a href="https://github.com/braydonlowe/startup">Startup Repo</a>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 CozyMaeFloral. All rights reserved.</p>
      </footer>
    </div>
  );
};
