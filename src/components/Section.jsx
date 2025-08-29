import React from "react";
import pic1 from "../assets/pic1.jpg";
import InfluencerFeatureHero from "./home/InfluencerFeatureHero";

function Section() {
  return (
    <div>
      <InfluencerFeatureHero
        headlineLine1="Supercharge Your Brand's Growth"
        headlineLine2="with the Right Influencers"
        description="Our platform helps emerging brands discover influencers, manage campaigns, and track performance — all in one place."
        primaryButtonLabel="Get Started"
        secondaryButtonLabel="Sign In"
        onPrimaryClick={() => {
          // Add your navigation or logic for Get Started button here
          console.log("Get Started clicked");
        }}
        onSecondaryClick={() => {
          // Add your navigation or logic for Sign In button here
          console.log("Sign In clicked");
        }}
      />
      {/* Other homepage content */}
    </div>
  );
}

export default Section;
