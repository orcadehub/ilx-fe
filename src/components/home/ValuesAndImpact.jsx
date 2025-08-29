import React from "react";

function ValuesAndImpact() {
  // Shared styles
  const wrapStyle = { backgroundColor: "#f7f9fc", padding: "48px 12px" };
  const sectionTitle = {
    textAlign: "center",
    fontWeight: 800,
    color: "#0b1220",
    fontSize: "2rem",
    marginBottom: 60,
  };

  // Card styles
  const cardStyle = {
    backgroundColor: "#fff",
    border: "1px solid #e6e9f4",
    borderRadius: 16,
    boxShadow: "0 8px 26px rgba(17,24,39,.06)",
    padding: 24,
    height: "100%",
    textAlign: "center",
  };
  const iconCircle = {
    width: 64,
    height: 64,
    borderRadius: "50%",
    backgroundColor: "#eceafd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6F6AE6",
    fontSize: 28,
    margin: "0 auto 12px auto",
    boxShadow: "0 2px 8px rgba(138,122,255,.07)",
  };
  const cardH = { fontWeight: 700, color: "#111827", marginBottom: 8, fontSize: "1.05rem" };
  const cardP = { color: "#6B7280", fontSize: ".98rem", lineHeight: 1.55, margin: 0 };

  // Impact styles
  const impactBand = { backgroundColor: "#f0f4f8", padding: "42px 12px 56px" };
  const impactTitle = {
    textAlign: "center",
    fontWeight: 800,
    color: "#0b1220",
    fontSize: "2rem",
    marginBottom: 60,
  };
  const numStyle = {
    color: "#5b63e6",
    fontWeight: 800,
    fontSize: "2.2rem",
    marginBottom: 6,
  };
  const labelStyle = { color: "#6B7280", margin: 0 };

  const values = [
    {
      icon: "🤍",
      title: "Authenticity",
      text:
        "We believe in genuine connections between brands and creators, fostering authentic relationships that drive real results.",
    },
    {
      icon: "🌐",
      title: "Global Impact",
      text:
        "Connecting brands and influencers worldwide to create campaigns that resonate across cultures and communities.",
    },
    {
      icon: "💡",
      title: "Innovation",
      text:
        "Continuously evolving our platform with cutting‑edge technology to stay ahead of industry trends.",
    },
    {
      icon: "🎖️",
      title: "Excellence",
      text:
        "Committed to delivering exceptional results and experiences for both brands and content creators.",
    },
  ];

  const impact = [
    { num: "10,000+", label: "Active Influencers" },
    { num: "500+", label: "Brand Partners" },
    { num: "1M+", label: "Campaigns Launched" },
    { num: "50+", label: "Countries Served" },
  ];

  return (
    <section style={{ backgroundColor: "#f7f9fc" }}>
      {/* Our Values */}
      <div style={wrapStyle}>
        <div className="container">
          <h2 style={sectionTitle}>Our Values</h2>

          <div className="row g-4 justify-content-center">
            {values.map((v, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3 d-flex">
                <div style={cardStyle} className="w-100">
                  <div style={iconCircle}>
                    <span style={{ transform: "translateY(-1px)" }}>{v.icon}</span>
                  </div>
                  <div style={cardH}>{v.title}</div>
                  <p style={cardP}>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Impact */}
      <div  className="my-5">
        <div className="container">
          <h2 style={impactTitle}>Our Impact</h2>
          <div className="row g-4 justify-content-center text-center">
            {impact.map((it, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div style={numStyle}>{it.num}</div>
                <p style={labelStyle}>{it.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesAndImpact;
