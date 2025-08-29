import React from "react";
import InfluencerFeatureHero from "../components/home/InfluencerFeatureHero";
import Vision from "../components/home/Vision";
import ValuesAndImpact from "../components/home/ValuesAndImpact";
import Join from "../components/home/Join";

function About() {
  return (
    <div>
      <InfluencerFeatureHero
        headlineLine1="Empowering Authentic"
        headlineLine2="Brand-Creator Connections"
        description="We're on a mission to revolutionize influencer marketing by creating meaningful partnerships that drive real results for brands and creators alike."
        primaryButtonLabel="Get Started Today"
        secondaryButtonLabel="Contact us"
        onPrimaryClick={() => {
          // Add your navigation or logic for Get Started button here
          console.log("Get Started clicked");
        }}
        onSecondaryClick={() => {
          // Add your navigation or logic for Sign In button here
          console.log("Sign In clicked");
        }}
      />

      <Vision/>
      <ValuesAndImpact/>
      <Join/>
    </div>
  );
}

export default About;
