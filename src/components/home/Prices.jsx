import React from "react";

const Check = () => (
  <span style={{ color: "#10B981", marginRight: 8, fontWeight: 700 }}>✓</span>
);
const Cross = () => (
  <span style={{ color: "#9CA3AF", marginRight: 8, fontWeight: 700 }}>✕</span>
);

function Prices() {
  return (
    <>
      <style>
        {`
          .pricing-wrap {
            background:#F7F9FC;
            padding: 56px 16px;
          }
          .pricing-grid {
            display:grid;
            grid-template-columns: repeat(3, minmax(260px, 420px));
            gap: 28px;
            justify-content: center;
          }
         
          .card.popular {
            border-color:#C7CBFF;
            box-shadow: 0 14px 42px rgba(83, 87, 235, .18);
          }
          .card {
  position: relative;           /* establish positioning context */
  overflow: visible;            /* allow badge to render outside */
  border: 1px solid #E6E9F4;
  border-radius: 18px;
  box-shadow: 0 8px 26px rgba(17, 24, 39, .06);
  padding: 28px 26px 26px 26px;
}

.badge-popular {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #5357EB;
  color: #fff;
  font-weight: 700;
  font-size: .78rem;
  padding: 6px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 16px rgba(83,87,235,.3);
  z-index: 3;                   /* sit above card contents */
}

          .icon-circle {
            width:60px;height:60px;border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            margin: 0 auto 14px auto;
            color:#6F6AE6;
            background:#ECEAFD;
            font-size:22px;font-weight:700;
          }
          .title {
            text-align:center;
            font-weight:800;color:#111827;margin-bottom:6px;font-size:1.25rem;
          }
          .price {
            text-align:center;margin:10px 0 14px 0;
            color:#111827;font-weight:800;font-size:2.2rem;
          }
          .per {
            color:#6B7280; font-size:.95rem; margin-left:6px; font-weight:600;
          }
          .sub {
            text-align:center;color:#6B7280;font-size: .98rem;
            max-width: 520px;margin: 0 auto 14px auto; line-height:1.5;
          }
          .section-h {
            color:#111827;font-weight:800;margin:16px 0 10px 0; font-size:1rem;
          }
          .list {margin:0;padding:0; list-style:none;}
          .list li {
            color:#374151; font-size:.98rem; margin:10px 0; display:flex; align-items:flex-start;
          }
          .limit { color:#6B7280; }
          .cta {
            margin-top:18px; width:100%;
            background:#EEF2FF; color:#5357EB;
            border:none; border-radius:12px; padding:14px 18px;
            font-weight:700; cursor:pointer;
          }
          .popular .cta {
            background:#5357EB; color:#fff;
          }
          .cta:focus { outline: none; }
          .footer-note { text-align:center; color:#6B7280; margin-top:6px; font-size:.9rem; }
          @media (max-width: 992px){
            .pricing-grid { grid-template-columns: 1fr; }
            .card { max-width: 560px; margin: 0 auto; }
          }
        `}
      </style>

      <section className="pricing-wrap">
        <div className="pricing-grid">
          {/* Starter */}
          <div className="card">
            <div className="icon-circle">★</div>
            <div className="title">Starter</div>
            <div className="price">
              ₹499<span className="per">/per month</span>
            </div>
            <p className="sub">
              Perfect for small businesses getting started with influencer
              marketing
            </p>

            <div className="section-h">What's included:</div>
            <ul className="list">
              <li>
                <Check />
                Up to 5 influencer searches per month
              </li>
              <li>
                <Check />
                Basic campaign analytics
              </li>
              <li>
                <Check />
                Email support
              </li>
              <li>
                <Check />
                Access to micro-influencers
              </li>
              <li>
                <Check />
                Campaign templates
              </li>
            </ul>

            <div className="section-h">Limitations:</div>
            <ul className="list limit">
              <li>
                <Cross />
                No advanced filtering
              </li>
              <li>
                <Cross />
                Limited to 1 active campaign
              </li>
              <li>
                <Cross />
                No dedicated account manager
              </li>
            </ul>

            <button className="cta">Start Free Trial</button>
          </div>

          {/* Professional (Most Popular) */}
          <div className="card popular">
            <div className="badge-popular">Most Popular</div>
            <div className="icon-circle">⚡</div>
            <div className="title">Professional</div>
            <div className="price">
              ₹999<span className="per">/per month</span>
            </div>
            <p className="sub">
              Ideal for growing businesses ready to scale their influencer
              marketing
            </p>

            <div className="section-h">What's included:</div>
            <ul className="list">
              <li>
                <Check />
                Unlimited influencer searches
              </li>
              <li>
                <Check />
                Advanced analytics &amp; reporting
              </li>
              <li>
                <Check />
                Priority email support
              </li>
              <li>
                <Check />
                Access to all influencer tiers
              </li>
              <li>
                <Check />
                Campaign management tools
              </li>
              <li>
                <Check />
                A/B testing capabilities
              </li>
              <li>
                <Check />
                Custom campaign templates
              </li>
              <li>
                <Check />
                API access
              </li>
            </ul>

            <div className="section-h">Limitations:</div>
            <ul className="list limit">
              <li>
                <Cross />
                No dedicated account manager
              </li>
            </ul>

            <button className="cta">Start Free Trial</button>
          </div>

          {/* Enterprise */}
          <div className="card">
            <div className="icon-circle">👑</div>
            <div className="title">Enterprise</div>
            <div className="price">
              Custom<span className="per">/pricing</span>
            </div>
            <p className="sub">
              Comprehensive solution for large organizations with complex needs
            </p>

            <div className="section-h">What's included:</div>
            <ul className="list">
              <li>
                <Check />
                Everything in Professional
              </li>
              <li>
                <Check />
                Dedicated account manager
              </li>
              <li>
                <Check />
                Custom integrations
              </li>
              <li>
                <Check />
                White-label options
              </li>
              <li>
                <Check />
                Advanced team management
              </li>
              <li>
                <Check />
                Custom reporting
              </li>
              <li>
                <Check />
                SLA guarantees
              </li>
              <li>
                <Check />
                Training &amp; onboarding
              </li>
            </ul>

            <button
              className="cta"
              style={{ background: "#EEF2FF", color: "#111827" }}
            >
              Contact Sales
            </button>
            <div className="footer-note"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Prices;
