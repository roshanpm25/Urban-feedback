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
  <h4>Is there a way to attach a photo or image?</h4>
  <p>Yes, while submitting a complaint, you can optionally upload an image to help authorities understand the issue better.</p>
</div>

<div className="faq-item">
  <h4>Who will handle my complaint?</h4>
  <p>Complaints are assigned to ward-level officers or their teams based on the ward number you belong to.</p>
</div>
      </section>

      {/* Contact Support */}
      <section className="help-contact">
        <h3>Still need help?</h3>
      <p>Call our helpline: <strong>1800-123-456</strong></p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Fix My City | Help Center
      </footer>
    </div>
  );
};

export default Help;
