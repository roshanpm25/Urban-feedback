import React from 'react';
import './Help.css';
import Navbar from './Navbar';

const Help = () => {
  return (
    <div className="help-page">

    {/* navbar section */}
      <header><Navbar /></header>

      {/* Hero Section */}
      <section className="help-hero">
        <h1>Help Center</h1>
        <p>Need assistance using Fix My City? You’re in the right place!</p>
      </section>

      {/* Help Topics */}
      <section className="help-topics">
        <div className="help-card">
          <h3>How to Report a Complaint</h3>
          <p>Go to your dashboard → Click “New Complaint” → Fill the form with issue type, location & image.</p>
        </div>
        <div className="help-card">
          <h3>Tracking Complaint Status</h3>
          <p>Once submitted, complaints are visible in your profile with real-time status updates.</p>
        </div>
        <div className="help-card">
          <h3>Uploading Photos</h3>
          <p>You can upload images to support your complaint. Only JPG, PNG under 5MB are supported.</p>
        </div>
        <div className="help-card">
          <h3>Giving Feedback</h3>
          <p>Once your issue is resolved, go to “My Complaints” and submit your feedback.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="help-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Is my complaint visible to everyone?</h4>
          <p>No, only city officials and agents can see detailed info. Public view shows only the issue type and status.</p>
        </div>

        <div className="faq-item">
          <h4>Can I edit or delete a complaint?</h4>
          <p>You can edit or delete a complaint only before it’s assigned to an agent.</p>
        </div>

        <div className="faq-item">
          <h4>How do I reset my password?</h4>
          <p>Click on “Forgot Password” on the login page. An email will be sent with reset instructions.</p>
        </div>
      </section>

      {/* Contact Support */}
      <section className="help-contact">
        <h3>Still need help?</h3>
        <p>Email us at <a href="mailto:support@fixmycity.com">support@fixmycity.com</a></p>
        <p>Or call our helpline: <strong>1800-123-456</strong></p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Fix My City | Help Center
      </footer>
    </div>
  );
};

export default Help;
