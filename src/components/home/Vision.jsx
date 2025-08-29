import React from "react";

function Vision() {
  const bandStyle = {
    backgroundColor: "#f3f6fa",
    padding: "56px 20px",
  };
  const storyBandStyle = {
    backgroundColor: "#f7f9fc",
    padding: "56px 20px 72px",
  };
  const containerStyle = { maxWidth: 1100, margin: "0 auto" };
  const h2Style = {
    fontSize: "2rem",
    fontWeight: 800,
    marginBottom: 16,
    color: "#0b1220",
  };
  const pStyle = {
    fontSize: "1.05rem",
    lineHeight: 1.75,
    color: "#475569",
    margin: "0 0 18px 0",
  };
  const storyTitleStyle = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0b1220",
    marginBottom: 22,
  };
  const storyBodyStyle = {
    maxWidth: 980,
    margin: "0 auto",
    color: "#475569",
    lineHeight: 1.85,
    fontSize: "1.05rem",
  };
  const dividerStyle = {
    height: 1,
    backgroundColor: "#e6e9f4",
    border: "none",
    margin: 0,
  };

  return (
    <section style={{ backgroundColor: "#f8fafc" }}>
      {/* Mission + Vision */}
      <div style={bandStyle}>
        <div className="container" style={containerStyle}>
          <div className="row g-5">
            <div className="col-12 col-lg-6">
              <h2 style={h2Style}>Our Mission</h2>
              <p style={pStyle}>
                To democratize influencer marketing by providing brands of all sizes with the
                tools and insights they need to connect with authentic creators and measure real impact.
              </p>
              <p style={pStyle}>
                We believe that every brand has a story worth telling, and every creator has a
                unique voice that deserves to be heard. Our platform bridges this gap, creating
                opportunities for meaningful collaborations that benefit everyone involved.
              </p>
            </div>

            <div className="col-12 col-lg-6">
              <h2 style={h2Style}>Our Vision</h2>
              <p style={pStyle}>
                To become the world's most trusted platform for influencer marketing, where
                authenticity, transparency, and mutual success are at the heart of every campaign.
              </p>
              <p style={pStyle}>
                We envision a future where influencer marketing is not just about reach and impressions,
                but about building genuine communities and driving meaningful change in the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div style={storyBandStyle}>
        <div className="container" style={containerStyle}>
          <h2 style={storyTitleStyle}>Our Story</h2>
          <div style={storyBodyStyle}>
            <p style={{ margin: "0 0 16px 0" }}>
              InfluexKonnect was born from a simple observation: the disconnect between brands seeking
              authentic promotion and creators looking for meaningful partnerships. Founded in 2023 by a
              team of marketing professionals and technology experts, we set out to solve this challenge.
            </p>
            <p style={{ margin: "0 0 16px 0" }}>
              Our founders experienced firsthand the frustrations of traditional influencer marketing —
              from fake followers and inflated metrics to poor campaign tracking and ROI measurement. They
              envisioned a platform that would bring transparency, authenticity, and data-driven insights
              to the industry.
            </p>
            <p style={{ margin: 0 }}>
              Today, InfluexKonnect serves thousands of brands and creators worldwide, facilitating
              genuine partnerships that drive real business results. We’re proud to be at the forefront
              of the evolution in influencer marketing, continuously innovating to meet the changing
              needs of our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;
