// src/components/BusinessInfo.js
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Button,
  Modal,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Pencil, CurrencyRupee, Plus, Trash } from "react-bootstrap-icons";
import config from "../../config";

// Base URL from config
const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

/* =========================
   Default schema builders
   ========================= */
const defaultPlatforms = () => ({
  facebook: {
    "Post Image/Video": "0",
    "Reels/Shorts": "0",
    "Story (Image/Video)": "0",
    Polls: "0",
  },
  instagram: {
    "Post Image/Video": "0",
    "Reels/Shorts": "0",
    "Story (Image/Video)": "0",
  },
  youtube: {
    "Short Video (<10m)": "0",
    "Video (>10m)": "0",
  },
  twitter: {
    Post: "0",
    Polls: "0",
  },
});

const emptyCombo = () => ({
  name: "",
  price: "0", // string for caret stability
  description: "",
  platformsText: "", // CSV text while editing
  servicesText: "", // CSV text while editing
});

const emptyCustom = () => ({
  name: "",
  description: "",
  price: "0", // string for caret stability
});

/* =========================
   Modal to edit full prices JSON
   ========================= */
const EditPricesModal = ({
  show,
  onHide,
  initialPrices, // { facebook:{...}, instagram:{...}, youtube:{...}, twitter:{...}, combos:[], custom:[] }
  onSave, // (pricesObject) => void
  saving,
}) => {
  const [platforms, setPlatforms] = useState(defaultPlatforms());
  const [combos, setCombos] = useState([emptyCombo()]);
  const [custom, setCustom] = useState([emptyCustom()]);

  // Initialize from incoming data
  useEffect(() => {
    const p = defaultPlatforms();
    const incoming =
      initialPrices && typeof initialPrices === "object" ? initialPrices : null;

    if (incoming) {
      // Merge platforms; coerce to string for stable input caret
      const mergePlatform = (targetKey, srcObj) => {
        const merged = { ...p[targetKey] };
        Object.keys(srcObj || {}).forEach((k) => {
          merged[k] = String(srcObj[k] ?? "0");
        });
        p[targetKey] = merged;
      };
      mergePlatform("facebook", incoming.facebook || {});
      mergePlatform("instagram", incoming.instagram || {});
      mergePlatform("youtube", incoming.youtube || {});
      mergePlatform("twitter", incoming.twitter || {});
      setPlatforms(p);

      // Combos/custom arrays
      setCombos(
        Array.isArray(incoming.combos) && incoming.combos.length
          ? incoming.combos.map((c) => ({
              name: c.name || "",
              price: String(Number(c.price || 0)),
              description: c.description || "",
              platformsText: Array.isArray(c.platforms)
                ? c.platforms.join(", ")
                : "",
              servicesText: Array.isArray(c.services)
                ? c.services.join(", ")
                : "",
            }))
          : [emptyCombo()]
      );
      setCustom(
        Array.isArray(incoming.custom) && incoming.custom.length
          ? incoming.custom.map((c) => ({
              name: c.name || "",
              description: c.description || "",
              price: String(Number(c.price || 0)),
            }))
          : [emptyCustom()]
      );
    } else {
      setPlatforms(p);
      setCombos([emptyCombo()]);
      setCustom([emptyCustom()]);
    }
  }, [initialPrices, show]); // Re-seed when opened or initial changes [1]

  // Update a platform price key (keep as string, allow only digits)
  const setPlatformPrice = (platformKey, itemKey, raw) => {
    const safe = raw.replace(/[^\d]/g, ""); // digits only
    setPlatforms((prev) => ({
      ...prev,
      [platformKey]: {
        ...prev[platformKey],
        [itemKey]: safe,
      },
    }));
  }; // Keeping inputs as strings preserves caret and avoids jumpiness. [1]

  // Combos handlers
  const addCombo = () => setCombos((prev) => [...prev, emptyCombo()]);
  const removeCombo = (idx) =>
    setCombos((prev) => prev.filter((_, i) => i !== idx));
  const updateComboField = (idx, field, value) =>
    setCombos((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );

  // Custom handlers
  const addCustom = () => setCustom((prev) => [...prev, emptyCustom()]);
  const removeCustom = (idx) =>
    setCustom((prev) => prev.filter((_, i) => i !== idx));
  const updateCustomField = (idx, field, value) =>
    setCustom((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );

  // Build payload and save (coerce numbers and parse CSV here)
  const handleSave = () => {
    // Normalize platform prices to numbers
    const normalizedPlatforms = Object.fromEntries(
      Object.entries(platforms).map(([pKey, items]) => [
        pKey,
        Object.fromEntries(
          Object.entries(items).map(([k, v]) => [k, v === "" ? 0 : Number(v)])
        ),
      ])
    ); // Numeric coercion deferred to Save for accuracy and UX. [1]

    const payload = {
      ...normalizedPlatforms,
      combos: combos.map((c) => ({
        name: c.name || "",
        price: Number(c.price || 0),
        description: c.description || "",
        platforms: (c.platformsText || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        services: (c.servicesText || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      })),
      custom: custom.map((c) => ({
        name: c.name || "",
        description: c.description || "",
        price: Number(c.price || 0),
      })),
    }; // CSV parsing on Save lets commas be typed naturally in the field. [1]

    onSave(payload);
  };

  const PlatformSection = ({ title, pKey, keys }) => (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Header className="bg-white">
        <strong>{title}</strong>
      </Card.Header>
      <Card.Body>
        <Row xs={1} md={2} lg={3}>
          {keys.map((k) => (
            <Col key={k} className="mb-2">
              <div className="small mb-1">{k}</div>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white">
                  <CurrencyRupee size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={platforms[pKey][k] ?? ""}
                  onChange={(e) => setPlatformPrice(pKey, k, e.target.value)}
                  placeholder="0"
                />
              </InputGroup>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      scrollable
      dialogClassName="edit-prices-modal"
      style={{ zIndex: 1400 }}
    >
      <style>{`
        .modal.edit-prices-modal { z-index: 1400; }
        .modal-backdrop { z-index: 1399; }
      `}</style>

      <Modal.Header closeButton>
        <Modal.Title>Edit Prices</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Platforms */}
        <PlatformSection
          title="Facebook"
          pKey="facebook"
          keys={[
            "Post Image/Video",
            "Reels/Shorts",
            "Story (Image/Video)",
            "Polls",
          ]}
        />
        <PlatformSection
          title="Instagram"
          pKey="instagram"
          keys={["Post Image/Video", "Reels/Shorts", "Story (Image/Video)"]}
        />
        <PlatformSection
          title="YouTube"
          pKey="youtube"
          keys={["Short Video (<10m)", "Video (>10m)"]}
        />
        <PlatformSection
          title="Twitter"
          pKey="twitter"
          keys={["Post", "Polls"]}
        />

        {/* Combos */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <strong>Combos</strong>
            <Button size="sm" variant="outline-primary" onClick={addCombo}>
              <Plus className="me-1" /> Add Combo
            </Button>
          </Card.Header>
          <Card.Body>
            {combos.map((c, idx) => (
              <Card key={idx} className="mb-3 border">
                <Card.Body>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Label className="small">Name</Form.Label>
                      <Form.Control
                        value={c.name}
                        onChange={(e) =>
                          updateComboField(idx, "name", e.target.value)
                        }
                        placeholder="Combo name"
                        size="sm"
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Price</Form.Label>
                      <InputGroup size="sm">
                        <InputGroup.Text className="bg-white">
                          <CurrencyRupee size={14} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={c.price}
                          onChange={(e) =>
                            updateComboField(
                              idx,
                              "price",
                              e.target.value.replace(/[^\d]/g, "")
                            )
                          }
                          placeholder="0"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      <Form.Label className="small">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={c.description}
                        onChange={(e) =>
                          updateComboField(idx, "description", e.target.value)
                        }
                        placeholder="Describe the combo"
                        size="sm"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small">
                        Platforms (comma-separated)
                      </Form.Label>
                      <Form.Control
                        value={c.platformsText || ""}
                        onChange={(e) =>
                          updateComboField(idx, "platformsText", e.target.value)
                        }
                        placeholder="Instagram, Facebook"
                        size="sm"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="small">
                        Services (comma-separated)
                      </Form.Label>
                      <Form.Control
                        value={c.servicesText || ""}
                        onChange={(e) =>
                          updateComboField(idx, "servicesText", e.target.value)
                        }
                        placeholder="Reels/Shorts, In-Video Promotion"
                        size="sm"
                      />
                    </Col>
                  </Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeCombo(idx)}
                    >
                      <Trash className="me-1" /> Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
            {combos.length === 0 && (
              <div className="text-muted small">No combos. Add one.</div>
            )}
          </Card.Body>
        </Card>

        {/* Custom */}
        <Card className="mb-1 border-0 shadow-sm">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <strong>Custom</strong>
            <Button size="sm" variant="outline-primary" onClick={addCustom}>
              <Plus className="me-1" /> Add Custom
            </Button>
          </Card.Header>
          <Card.Body>
            {custom.map((c, idx) => (
              <Card key={idx} className="mb-3 border">
                <Card.Body>
                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Label className="small">Name</Form.Label>
                      <Form.Control
                        value={c.name}
                        onChange={(e) =>
                          updateCustomField(idx, "name", e.target.value)
                        }
                        placeholder="Custom name"
                        size="sm"
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label className="small">Price</Form.Label>
                      <InputGroup size="sm">
                        <InputGroup.Text className="bg-white">
                          <CurrencyRupee size={14} />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={c.price}
                          onChange={(e) =>
                            updateCustomField(
                              idx,
                              "price",
                              e.target.value.replace(/[^\d]/g, "")
                            )
                          }
                          placeholder="0"
                        />
                      </InputGroup>
                    </Col>
                    <Col md={12}>
                      <Form.Label className="small">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={c.description}
                        onChange={(e) =>
                          updateCustomField(idx, "description", e.target.value)
                        }
                        placeholder="Describe the custom offer"
                        size="sm"
                      />
                    </Col>
                  </Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeCustom(idx)}
                    >
                      <Trash className="me-1" /> Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
            {custom.length === 0 && (
              <div className="text-muted small">No custom items. Add one.</div>
            )}
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="px-4"
          style={{ background: "#324bff", border: "none" }}
          disabled={saving}
        >
          {saving ? <Spinner size="sm" animation="border" /> : "Save Prices"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* =========================
   Business Info (Parent)
   ========================= */
const BusinessInfo = ({ user, setShowEdit }) => {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [initialPrices, setInitialPrices] = useState(null);
  const [saving, setSaving] = useState(false);

  const canEditPrices = user?.role === "influencer";

  // GET existing prices JSON stored in users.prices
  const fetchUserPrices = async (userId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/api/prices/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to load prices");
    const incoming = data?.data?.prices;
    return incoming && typeof incoming === "object" ? incoming : null;
  }; // Fetch PUT/GET use standard JSON headers and parsing patterns. [2][1]

  const openEditPrices = async () => {
    try {
      const incoming = await fetchUserPrices(user?.id);
      setInitialPrices(incoming || undefined);
    } catch (e) {
      setInitialPrices(undefined);
      console.error("Load prices failed:", e.message);
    }
    setShowPriceModal(true);
  };

  // PUT full JSON into users.prices
  const savePricesJSON = async (userId, pricesObject) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseURL}/api/prices/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prices: pricesObject }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to update prices");
    return data;
  }; // PUT with JSON body and Content-Type is required for server parsing. [2][1]

  const handleSave = async (pricesObject) => {
    setSaving(true);
    try {
      await savePricesJSON(user?.id, pricesObject);
      setInitialPrices(pricesObject);
      setShowPriceModal(false);
    } catch (e) {
      console.error("Save prices failed:", e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* ===== Business Info Card ===== */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center border-bottom">
          <h6 className="mb-0">Business Info</h6>
          <div className="d-flex align-items-center gap-2">
            <Button
              size="sm"
              onClick={() => setShowEdit(true)}
              style={{
                background: "linear-gradient(90deg, #4B0082 0%, #800080 100%)",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "600",
                fontSize: "14px",
                letterSpacing: "0.5px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 4px 12px rgba(75, 0, 130, 0.3)";
                e.target.style.background =
                  "linear-gradient(90deg, #6A0DAD 0%, #9B30FF 100%)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
                e.target.style.background =
                  "linear-gradient(90deg, #4B0082 0%, #800080 100%)";
              }}
            >
              <Pencil size={14} color="#FFFFFF" /> Edit
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          {/* ===== Company Details ===== */}
          <section className="mb-3">
            <header className="text-muted small mb-2">Company</header>
            <div className="mb-2">
              <small className="text-muted">Business Name</small>
              <p className="mb-2">{user?.business_name || "ABC Company"}</p>
            </div>
            <div className="mb-2">
              <small className="text-muted">Category</small>
              <p className="mb-2">{user?.category || "XYZ Products"}</p>
            </div>
            <div className="mb-2">
              <small className="text-muted">Business Status</small>
              <p className="mb-2">
                {user?.business_status || "Not Registered"}
              </p>
            </div>
            <div className="mb-2">
              <small className="text-muted">Service Type</small>
              <p className="mb-2">{user?.service_type || "Online & Offline"}</p>
            </div>
          </section>

          {/* ===== Web/Location ===== */}
          <section className="mb-3">
            <header className="text-muted small mb-2">Web & Location</header>
            <div className="mb-2">
              <small className="text-muted">Visit our site</small>
              <p className="mb-2">
                <a href={user?.website || "#"}>
                  {user?.website || "www.xyz.com"}
                </a>
              </p>
            </div>
            <div className="mb-2">
              <small className="text-muted">Location</small>
              <p className="mb-2">{user?.location || "[Address]"}</p>
            </div>
            <div className="mb-0">
              <small className="text-muted">Price Range</small>
              <p className="mb-0">{user?.price_range || "₹5,000 - 50,000"}</p>
            </div>
          </section>

          {/* ===== Pricing (Influencers only) ===== */}
          {canEditPrices && (
            <section className="mt-3 pt-3 border-top">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Pricing</small>
                  <div className="fw-semibold">Influencer Service Prices</div>
                </div>
                <Button
                  size="sm"
                  onClick={openEditPrices}
                  style={{
                    background:
                      "linear-gradient(90deg, #4B0082 0%, #800080 100%)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: "600",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(75, 0, 130, 0.3)";
                    e.target.style.background =
                      "linear-gradient(90deg, #6A0DAD 0%, #9B30FF 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                    e.target.style.background =
                      "linear-gradient(90deg, #4B0082 0%, #800080 100%)";
                  }}
                >
                  <Pencil size={14} color="#FFFFFF" /> Edit
                </Button>
              </div>
            </section>
          )}
        </Card.Body>
      </Card>

      {/* ===== Edit Prices Modal ===== */}
      <EditPricesModal
        show={showPriceModal}
        onHide={() => setShowPriceModal(false)}
        initialPrices={initialPrices || undefined}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
};

export default BusinessInfo;
