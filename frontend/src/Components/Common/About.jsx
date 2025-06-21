import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero / Introduction */}
      <section className="about-hero">
        <h1>About Fix My City</h1>
        <p>
          Fix My City is a digital civic engagement platform built to empower citizens to report, track, and resolve local infrastructure issues with ease.
          Our mission is to bridge the gap between communities and authorities by providing a transparent and accessible solution.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="mission-box">
          <h2>Our Mission</h2>
          <p>
            To create smarter, cleaner, and more responsive urban spaces through community collaboration and real-time feedback.
          </p>
        </div>
        <div className="mission-box">
          <h2>Our Story</h2>
          <p>
            Launched in 2025, Fix My City began as a college project and evolved into a growing citizen-first platform used across various municipalities.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <h2>What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🗺️ Report Issues</h3>
            <p>Capture the issue with photos, location, and details.</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Get notified as your complaint is assigned and resolved.</p>
          </div>
          <div className="feature-card">
            <h3>Give Feedback</h3>
            <p>Rate your experience and help improve civic services.</p>
          </div>
          <div className="feature-card">
            <h3>Suggest Improvements</h3>
            <p>Share suggestions for better city planning and safety.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stat-box">
          <h2>10,000+</h2>
          <p>Registered Users</p>
        </div>
        <div className="stat-box">
          <h2>6,500+</h2>
          <p>Complaints Resolved</p>
        </div>
        <div className="stat-box">
          <h2>4.8★</h2>
          <p>User Rating</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial">
          <p>“Fix My City helped me get a broken streetlight fixed within 2 days. Super easy to use!”</p>
          <span>- Arjun, Chennai</span>
        </div>
        <div className="testimonial">
          <p>“Finally a platform that makes civic complaints transparent and trackable.”</p>
          <span>- Priya, Bengaluru</span>
        </div>
      </section>

      {/* Help & Feedback */}
      <section className="about-links">
        <h3>Need Assistance?</h3>
        <p>
          Visit our <a href="Help.jsx">Help Center</a> for guides and FAQs.
        </p>
        <h3>Want to Share Your Thoughts?</h3>
        <p>
          Give us your suggestions via the <a href="Home.jsx">Feedback Portal</a>.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Fix My City | Built with ❤️ by civic-minded developers.
      </footer>
    </div>
  );
};

export default About;
