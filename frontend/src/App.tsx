// app.tsx
import React, { useState } from "react";
import "./app.css";
import Login from "./Login";
import SignUp from "./SignUp";
import RoboticsHome from "./pages/home_page1/RoboticsHome";


const Hero = () => (
  <section className="hero-section">
    <nav className="navbar">
      <div className="logo">roboveda</div>
      <ul className="nav-links">
        <li>Product</li>
        <li>Enterprise</li>
        <li>Pricing</li>
        <li>Contact</li>
        <li><button className="cta-btn">Sign Up</button></li>
      </ul>
    </nav>
    <div className="hero-content">
      <h1>The future of building happens together</h1>
      <p>Accelerate your entire workflow and build secure, scalable software on the platform developers worldwide trust and love.</p>
      <button className="hero-action">Start for free</button>
    </div>
    {/* Add an illustrative image or mascot component here */
    <img src="src/assets/bird.png" alt="Hero mascot" className="hero-mascot"/>
}
  </section>
);

const WorkflowSection = () => (
  <section className="workflow-section">
    <h2>Accelerate your entire workflow</h2>
    <p>Automate, collaborate, and ship faster with powerful developer tools and integrations.</p>
    {/* Code block or screenshot can go here */
    <img src="src/assets/workflow.png" alt="Workflow integration dashboard" className="workflow-img"/>
}
   
  </section>
);

const SecuritySection = () => (
  <section className="security-section">
    <h2>Built-in application security where found means fixed</h2>
    <p>Get instant security features in every repo, with scanning and secret detection out-of-the-box.</p>
    {
      <img src="src/assets/secirity.png" alt="Security dashboard with code scanning" className="security-img"/>
}
    
  </section>
);

const EnterpriseSection = () => (
  <section className="enterprise-section">
    <h2>From startups to enterprises</h2>
    <p>Scale with confidence, no matter your team size or industry.</p>
    {/* Partner/company logos can go here */}
    <div className="enterprise-logos" />
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div>© 2025 roboveda. All rights reserved.</div>
    {/* Links, contact, or social icons if desired */}
  </footer>
);

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login/signup
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication

  // This function is called after successful login/signup
  const handleAuthSuccess = () => setIsAuthenticated(true);

// Show RoboticsHome after login/signup, else show forms
  return (
    <div>
      {!isAuthenticated ? (
        <>
          <Hero />
          <WorkflowSection />
          <SecuritySection />
          <EnterpriseSection />
          {isLogin ? (
            <Login onLogin={handleAuthSuccess} />
          ) : (
            <SignUp onSignUp={handleAuthSuccess} />
          )}
          <button onClick={() => setIsLogin(!isLogin)} className="auth-switch">
            Switch to {isLogin ? "Sign Up" : "Login"}
          </button>
        </>
      ) : (
        <RoboticsHome />
      )}
      <Footer />
    </div>
  );
};

export default App;