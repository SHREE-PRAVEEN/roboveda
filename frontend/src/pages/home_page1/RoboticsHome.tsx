import React from "react";
import "./app.css";

const RoboticsHome: React.FC = () => (
  <div className="robotics-home">
    <header className="hero-section">
      <h1>Robotics Startup Blueprint</h1>
      <p>Your Idea Polished & Structured</p>
    </header>

    <section className="home-section">
      <h2>Freemium Robotics Platform</h2>

      <div className="tier">
        <h3>Free Offering (to attract users)</h3>
        <ul>
          <li>Complete hardware setup guides for DIY robots (robot arm, mobile robot, drone basics, conveyor automation, sensors integration, IoT robotics)</li>
          <li>Tutorials for students and hobbyists</li>
          <li>Industry-focused automation setup references</li>
        </ul>
      </div>

      <div className="tier">
        <h3>Premium Offering (Revenue)</h3>
        <ul>
          <li>Pre-built robotics control software:</li>
          <li>✓ Motor control</li>
          <li>✓ Sensor calibration</li>
          <li>✓ AI/vision modules</li>
          <li>✓ Path planning</li>
          <li>✓ PLC integration</li>
          <li>✓ Dashboard + analytics</li>
        </ul>
        <p className="premium-price"><strong>Price:</strong> $1.6 (Very affordable → high volume sales)</p>
      </div>
    </section>
  </div>
);

export default RoboticsHome;
