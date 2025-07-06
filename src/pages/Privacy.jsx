import React from 'react';

const Privacy = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="mb-4" style={{ fontWeight: 'bold', color: '#2c3e50' }}>Privacy Policy – Influex Konnect</h2>
      <p><strong>Effective Date:</strong> July 5, 2025</p>

      <p>At <strong>Influex Konnect</strong>, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information while using our platform.</p>

      <h5 className="mt-4">1. Information We Collect</h5>
      <ul>
        <li>Your name, email address, phone number</li>
        <li>Social media handles or profile URLs (Instagram, Facebook, Twitter, YouTube)</li>
        <li>Account preferences and settings</li>
        <li>Device and browser data (for analytics and security)</li>
      </ul>

      <h5 className="mt-4">2. How We Use Your Information</h5>
      <p>Your data is used to:</p>
      <ul>
        <li>Customize your user experience</li>
        <li>Facilitate social media integrations (OAuth logins)</li>
        <li>Provide personalized recommendations</li>
        <li>Send notifications related to platform updates, opportunities, or support</li>
      </ul>
      <p><strong>We do not sell or rent</strong> your personal data to third parties.</p>

      <h5 className="mt-4">3. Third-Party Integrations</h5>
      <p>Influex Konnect integrates with platforms such as:</p>
      <ul>
        <li>Facebook</li>
        <li>Instagram</li>
        <li>YouTube</li>
        <li>Twitter</li>
      </ul>
      <p>When you connect your social accounts, we may access basic public profile information, following the respective platform’s privacy policies. You may disconnect at any time.</p>

      <h5 className="mt-4">4. Data Security</h5>
      <p>We use industry-standard encryption, secure authentication, and strict access controls to protect your data.</p>

      <h5 className="mt-4">5. User Control</h5>
      <p>You have the right to:</p>
      <ul>
        <li>View and edit your personal information</li>
        <li>Disconnect your social media accounts</li>
        <li>Request deletion of your account or personal data by contacting support</li>
      </ul>

      <h5 className="mt-4">6. Cookies & Analytics</h5>
      <p>We use cookies to:</p>
      <ul>
        <li>Maintain your session</li>
        <li>Understand usage trends</li>
        <li>Improve overall user experience</li>
      </ul>
      <p>You can disable cookies through your browser settings.</p>

      <h5 className="mt-4">7. Changes to This Policy</h5>
      <p>We may update this Privacy Policy periodically. Changes will be reflected here with an updated "Effective Date."</p>

      <h5 className="mt-4">8. Contact Us</h5>
      <p>
        For questions or requests regarding your data or privacy:<br />
        📧 <strong>support@influexkonnect.com</strong><br />
        📞 <strong>+91-7093012101</strong>
      </p>
    </div>
  );
};

export default Privacy;
