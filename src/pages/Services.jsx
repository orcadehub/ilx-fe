// src/components/Services.js
import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../config";
import NotifyMe from "../components/NotifyMe";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const servicesData = {
  "Design Services": [
    { id: "posts", title: "Posts" },
    { id: "reels", title: "Reels/Shorts" },
    { id: "logo", title: "Logo Design" },
    { id: "logo-animation", title: "Logo Animation" },
  ],
  "Marketing Services": [
    { id: "ppc", title: "Pay per click" },
    { id: "seo", title: "SEO Ranking" },
    { id: "analytics", title: "Google Analytics" },
    { id: "business", title: "Google Business" },
  ],
  "Social Media Campaigns": [
    { id: "instagram", title: "Instagram" },
    { id: "snapchat", title: "Snapchat" },
    { id: "youtube", title: "YouTube" },
    { id: "twitter", title: "Twitter" },
    { id: "pinterest", title: "Pinterest" },
    { id: "facebook", title: "Facebook" },
    { id: "googleads", title: "Google Ads" },
    { id: "linkedin", title: "LinkedIn" },
  ],
  "OTT Campaigns": [
    { id: "hotstar", title: "Hotstar" },
    { id: "amazon", title: "Amazon" },
    { id: "zeetv", title: "ZeeTV" },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showMobileForm, setShowMobileForm] = useState(false); // Mobile form visibility state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    projectDescription: "",
    budget: "",
    timeline: "",
  });
  const [formStatus, setFormStatus] = useState(null); // { type: 'success'|'error', message: string }
  const [isLoading, setIsLoading] = useState(false); // Loading state



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBackToServices = () => {
    setShowMobileForm(false);
    setSelectedService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      setFormStatus({ type: "error", message: "Please select a service" });
      return;
    }

    setIsLoading(true); // Show loading screen
    try {
      const response = await fetch(`${baseURL}/api/service-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceTitle: selectedService.title,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          type: "success",
          message: "Service request submitted successfully! You'll receive a confirmation email soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          projectDescription: "",
          budget: "",
          timeline: "",
        });
        setSelectedService(null);
      } else {
        setFormStatus({ type: "error", message: data.message || "Failed to submit service request" });
      }
    } catch (error) {
      console.error("Error submitting service request:", error);
      setFormStatus({ type: "error", message: "Server error. Please try again later." });
    } finally {
      setIsLoading(false); // Hide loading screen
    }
  };

  const renderForm = () => {
    return !selectedService ? (
      <div
        className="text-center py-5 rounded-xl !border !border-[var(--border)] !bg-[var(--bg)] !text-[var(--text)] !h-full flex justify-center items-center"
        style={{
          fontSize: "1.5rem",
          fontWeight: 500,
        }}
      >
        Please select a service to continue
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "relative" }}
      >
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              borderRadius: "1rem",
            }}
          >
            <Spinner animation="border" variant="primary" />
            <span className="ms-2" style={{ color: "var(--text)" }}>Submitting...</span>
          </div>
        )}
        {console.log('--->', selectedService)}
        {(selectedService.id == "amazon" || selectedService.id == "zeetv" || selectedService.id == "hotstar") ?
          <NotifyMe /> :
          <div
            className="p-4 rounded-xl !border !border-[var(--border)] !bg-[var(--card)]"
            style={{
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            <h5 className="mb-4 text-[var(--text)]">
              Request {selectedService.title} Service
            </h5>
            {formStatus && (
              <Alert
                variant={formStatus.type === "success" ? "success" : "danger"}
                onClose={() => setFormStatus(null)}
                dismissible
              >
                {formStatus.message}
              </Alert>
            )}
            <Form className="text-[14px] " onSubmit={handleSubmit}>
              <Form.Group className="mb-3 ">
                <Form.Label className="text-[var(--text)]">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !border !border-[var(--border)] !text-[var(--text)] placeholder:!text-[var(--text)] !text-[12px]"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-[var(--text)]">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !border !border-[var(--border)] !text-[var(--text)] placeholder:!text-[var(--text)] !text-[12px]"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className=" !text-[var(--text)]">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !border !border-[var(--border)] !text-[var(--text)] placeholder:!text-[var(--text)] !text-[12px]"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-[var(--text)]">Project Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your requirements"
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !min-h-[230px] !overflow-y-auto !border !border-[var(--border)] !text-[var(--text)] placeholder:!text-[var(--text)] !text-[12px]"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-[var(--text)]">Budget Range</Form.Label>
                <Form.Select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !border !border-[var(--border)] !text-[var(--text)] !text-[12px]"
                >
                  <option value="">Select Budget</option>
                  <option value="0-5000">₹0 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-25000">₹10,000 - ₹25,000</option>
                  <option value="25000+">₹25,000+</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label className="text-[var(--text)]">Timeline</Form.Label>
                <Form.Select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="!bg-[var(--bgPage)] !border !border-[var(--border)] !text-[var(--text)] !text-[12px]"
                >
                  <option value="">Select Timeline</option>
                  <option value="1week">1 Week</option>
                  <option value="2weeks">2 Weeks</option>
                  <option value="1month">1 Month</option>
                  <option value="flexible">Flexible</option>
                </Form.Select>
              </Form.Group>
              <Button
                style={{
                  backgroundColor: "var(--primary)",
                  border: "none",
                  borderRadius: "10px",
                }}
                className="w-100 font-medium text-white"
                type="submit"
                disabled={isLoading}
              >
                Submit Request
              </Button>
            </Form>
          </div>}
      </motion.div>
    );
  };

  const renderServiceCards = () => (
    <div className="p-2 sm:p-3 md:p-4">
      {Object.entries(servicesData).map(([category, services]) => (
        <div key={category} className="mb-4 sm:mb-6">
          <h6
            className="fw-semibold mb-3"
            style={{
              borderLeft: "4px solid var(--primary)",
              paddingLeft: "10px",
              color: "var(--text)",
            }}
          >
            {category}
            {category == "OTT Campaigns" && <span className="p-1 ml-1 font-normal text-12 text-yellow-500 bg-amber-100 rounded-xl">Comming Soon</span>}
          </h6>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 "
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div
                  onClick={() => {
                    setSelectedService(service);
                    setShowMobileForm(true); // Show form on mobile when service is selected
                  }}
                  className={`
                    text-center d-flex hover:shadow-xl flex-column justify-content-center align-items-center 
                    rounded-xl !border w-full aspect-rectangle  p-2 !py-3 sm:!py-4
                    !bg-[var(--bgPage2)] ${selectedService?.id === service.id
                      ? "!border-[var(--primary)] shadow"
                      : "!border-[var(--border)]"
                    } !bg-[var(--bgPage)]
                  `}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    boxShadow:
                      selectedService?.id === service.id
                        ? "0 0 10px rgba(37, 99, 235, 0.3)"
                        : "",
                  }}
                >
                  <Image
                    src={`/icons/${service.id}.png`}
                    alt={service.title}
                    className="mb-1 sm:mb-2 w-15 h-15 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:h-12 xl:w-12 object-contain"
                  />
                  <div className="text-[var(--text)] text-center px-1 text-xs sm:text-sm leading-tight">
                    {service.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="p-2 sm:p-4 md:p-6"
      style={{ backgroundColor: "var(--bgPage2)", minHeight: "100vh" }}
    >
      {!showMobileForm && <motion.h4
        className="mb-4 fw-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "var(--text)" }}
      >
        Services
      </motion.h4>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
        {/* Services Section - Conditionally shown on mobile, always shown on desktop */}
        <div className={`${showMobileForm ? 'hidden lg:block' : 'block'}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="p-2 sm:p-4 md:p-6 rounded-xl !border !border-[var(--border)] !bg-[var(--card)]"
            >
              {renderServiceCards()}
            </div>
          </motion.div>
        </div>

        {/* Form Section - Shown when service selected on mobile, always shown on desktop */}
        <div className={`${showMobileForm ? 'block' : 'hidden lg:block'}`}>
          {/* Back button for mobile */}
          {showMobileForm && (

            <div className="flex !items-center !justify-between relative w-full py-2">
  {/* Back button - left aligned */}
              <button onClick={handleBackToServices}
                className="absolute left-0 top-3 flex items-center gap-1 !text-[var(--text)] hover:text-[var(--primary)]">
  Back
  </button>

  {/* Title - centered */}
              <h2 className="text-lg font-semibold mx-auto text-center w-full !text-[var(--text)]">
    Services
  </h2>
</div>
            // <div className="lg:hidden mb-4">
            //   <button
            //     onClick={handleBackToServices}
            //     className="flex items-center gap-2 px-4 py-2 rounded-lg !bg-[var(--card)] !border !border-[var(--border)] !text-[var(--text)] hover:!bg-[var(--bgPage)] transition-colors"
            //   >
            //     <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            //       <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            //     </svg>
            //     Back
            //   </button>
            // </div>
          )}
          {renderForm()}
        </div>
      </div>


    </div>
  );
};

export default Services;