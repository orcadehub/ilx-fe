/* Contact page */
import React, { useState } from 'react';
import Faq from '../components/Faq';
import InfluencerFeatureHero from '../components/home/InfluencerFeatureHero';
import LuxContact from '../components/home/LuxContact';

function Contact() {
  // Form state (source of truth lives here)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers (passed down to LuxContact)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <InfluencerFeatureHero
        headlineLine1="Get in Touch - "
        headlineLine2="We're Here to Help"
        description="Have questions about our platform? Need help with your campaign? Our team is ready to assist you every step of the way."
        primaryButtonLabel="Start Free Trail"
        secondaryButtonLabel="View Pricing"
        onPrimaryClick={() => {
          console.log("Get Started clicked");
        }}
        onSecondaryClick={() => {
          console.log("Sign In clicked");
        }}
      />

      {/* LuxContact — receives props from parent */}
      <LuxContact
        formData={formData}
        formStatus={formStatus}
        isSubmitting={isSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // Optional presentation props (use or ignore inside LuxContact as needed)
        labels={{
          heading: 'Get in touch',
          formTitle: 'Send Us a Message',
          submitIdle: 'Send Message',
          submitBusy: 'Sending Message...',
          successMsg: 'Message Sent Successfully! We\'ll get back to you within 24 hours.'
        }}
        contactCards={[
          {
            icon: 'email',
            title: 'Email Us',
            text: "Have questions? Send us an email and we'll get back to you as soon as possible.",
            action: '[contact@influexkonnect.com](mailto:contact@influexkonnect.com)',
          },
          {
            icon: 'phone',
            title: 'Call Us',
            text: 'Need to talk to someone? Call our support team during business hours.',
            action: '+91 90526 49591',
          },
          {
            icon: 'location',
            title: 'Visit Us',
            text: "Come see us at our headquarters. We'd love to show you around our facilities.",
            action: '123 Innovation Street',
          },
        ]}
        office={{
          address: '123 Innovation Street, Tech City, TC 12345',
          hours: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday - Sunday: Closed'],
          hotline: '+1 (555) 123-4567',
        }}
      />

      <Faq />
    </div>
  );
}

export default Contact;
