import React, { useEffect, useState } from "react";

const InfluencerFeatureHero = ({
  headlineLine1,
  headlineLine2,
  description,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradientFadeIn {
            from {
              background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
            }
            to {
              background: linear-gradient(180deg, #7db5f4ff 0%, #f8fafc 100%);
            }
          }

          .hero-container {
            padding: 200px 0;
            text-align: center;
            border-radius: 8px;
            background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
            animation-fill-mode: forwards;
            animation-timing-function: ease-in;
            animation-duration: 1.5s;
            animation-name: gradientFadeIn;
          }

          .animated-fade-slide {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease-in, transform 1s ease-in;
          }
          .animated-fade-slide.loaded {
            opacity: 1;
            transform: translateY(0);
          }

          /* Responsive styles for smaller screens */
          @media (max-width: 768px) {
            .hero-container {
              padding: 100px 20px; /* less vertical and horizontal padding */
            }
            .hero-container h1 {
              font-size: 3rem !important;
              margin-bottom: 0.4em !important;
              line-height: 1.2 !important;
            }
            .hero-container p {
              font-size: 1rem !important;
              margin-bottom: 1.5em !important;
            }
            .hero-container div.animated-fade-slide.loaded > button {
              padding: 10px 24px !important;
              font-size: 0.9rem !important;
              margin-right: 1em !important;
              border-radius: 10px !important;
            }
            .hero-container div.animated-fade-slide.loaded > button:last-child {
              margin-right: 0 !important;
            }
          }

          @media (max-width: 480px) {
            .hero-container {
              padding: 70px 15px;
            }
            .hero-container h1 {
              font-size: 2.2rem !important;
              margin-bottom: 0.3em !important;
            }
            .hero-container p {
              font-size: 0.95rem !important;
              margin-bottom: 1.2em !important;
            }
            .hero-container div.animated-fade-slide.loaded > button {
              padding: 8px 20px !important;
              font-size: 0.85rem !important;
              margin-right: 0.8em !important;
              border-radius: 8px !important;
            }
          }
        `}
      </style>

      <div className="hero-container">
        <h1
          className={`animated-fade-slide ${loaded ? "loaded" : ""}`}
          style={{
            fontSize: "6rem",
            fontWeight: "bold",
            marginBottom: "0.5em",
            color: "#222",
            lineHeight: "1.1",
          }}
        >
          <span style={{ display: "block" }}>{headlineLine1}</span>
          <span style={{ display: "block" }}>{headlineLine2}</span>
        </h1>

        <p
          className={`animated-fade-slide ${loaded ? "loaded" : ""}`}
          style={{
            fontSize: "1.25rem",
            marginBottom: "2em",
            color: "#666",
            transitionDelay: "0.3s",
          }}
        >
          {description}
        </p>

        <div
          className={`animated-fade-slide ${loaded ? "loaded" : ""}`}
          style={{ transitionDelay: "0.5s" }}
        >
          <button
            style={{
              background: "#5357eb",
              color: "#fff",
              padding: "12px 36px",
              borderRadius: "12px",
              border: "none",
              fontSize: "1rem",
              marginRight: "1.5em",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={onPrimaryClick}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3ed4")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5357eb")}
          >
            {primaryButtonLabel}
          </button>

          <button
            style={{
              background: "none",
              color: "#222",
              padding: "12px 36px",
              borderRadius: "12px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
            onClick={onSecondaryClick}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#5357eb")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#222")}
          >
            {secondaryButtonLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default InfluencerFeatureHero;
