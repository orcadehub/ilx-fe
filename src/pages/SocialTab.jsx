import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter, Link, Unplug } from "lucide-react";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import config from "../config";
import SocialMediaSettingsModal from "../components/profile/SocialMediaSettingsModal";

const icons = {
  instagram: <div className="bg-pink-100 p-2 rounded-full !flex !justify-center !items-center">
    <Instagram className="text-pink-400" size={22} />
  </div>,
  facebook: <div className="bg-blue-100 p-2 rounded-full !flex !justify-center !items-center">
    <Facebook className="text-blue-500" size={22} />
  </div>,
  youtube: <div className="bg-red-100 p-2 rounded-full !flex !justify-center !items-center">
    <Youtube className="text-red-500" size={22} />
  </div>,
  twitter: <div className="bg-blue-100 p-2 rounded-full !flex !justify-center !items-center">
    <Twitter className="text-blue-400" size={22} />
  </div>,
};

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const SocialTab = () => {
  const [hovered, setHovered] = useState(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [platformToEdit, setPlatformToEdit] = useState(null);
  const [editingData, setEditingData] = useState({
    platformname:'',
    url: '',
    day: "",
    time: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${baseURL}/api/connect/status/${user?.email}`);
        const data = await res.json();
        setConnectedPlatforms(data);
      } catch (err) {
        console.error("Failed to fetch social status", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleConnectClick = (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.email;

    const oauthUrlMap = {
      facebook: `${baseURL}/api/connect/auth/facebook?userId=${userId}`,
      instagram: `${baseURL}/api/auth/instagram?userId=${userId}`,
      youtube: `${baseURL}/api/connect/auth/google?userId=${userId}`,
      twitter: `${baseURL}/api/auth/twitter?userId=${userId}`,
    };

    const redirectUrl = oauthUrlMap[platform];
    if (redirectUrl) window.open(redirectUrl, "_self");
  };

  const handleDisconnect = async (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await fetch(`${baseURL}/api/connect/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.email, platform }),
      });

      setConnectedPlatforms((prev) => ({
        ...prev,
        [platform]: {
          connected: false,
          username: null,
          profile_pic: null,
        },
      }));
    } catch (err) {
      console.error("Error disconnecting:", err);
    }
  };

  const handlEditClick = (platform) => {
    console.log("Editing platform:", platform);
   }

  const renderRow = (platform) => {
    const profile = connectedPlatforms[platform] || {};
    const isConnected = profile.connected;
    const username = profile.username;
    const profilePic = profile.profile_pic;

    return (
      <div key={platform}
        className=" p-3 !border !border-[var(--border)] rounded-2xl mb-4 w-full space-y-3">
      <div
        // key={platform}
        className="xl:flex align-items-center justify-between pt-3 w-full gap-3 space-y-2"
      // style={{ borderColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {/* Left side: Icon + Info */}
        <div className="d-flex align-items-center gap-2 w-full">
          {profilePic ? (
            <img
              src={profilePic}
              alt={`${platform} profile`}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                marginRight: 10,
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
          ) : (
            icons[platform]
          )}
          <div
            className={` p-2 border !border-[var(--border)] text-14  !bg-[var(--bgPage2)] !w-full ${isConnected ? "!text-[var(--text)]" : "text-[var(--mutedText)] rounded"}`}
            style={{ fontSize: "0.95rem" }}
          >
            {editingData.platformname == platform ? editingData.url: "No URL set yet"}
          </div>
        </div>

        {/* Right side: Action Button */}
        <div className="flex justify-end gap-4 w-full xl:!w-fit !text-[var(--text)]">
          <Button
            size="sm"
            className="!bg-[var(--bgPage2)] border !border-[var(--border)] px-3 py-2 w-fit !flex rounded-3  items-center gap-1 !text-[var(--text)]"
            onClick={() =>
              isConnected ? handleDisconnect(platform) : handleConnectClick(platform)
            }
            onMouseEnter={() => setHovered(platform)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transition: "all 0.2s ease-in-out",
              transform: hovered === platform ? "scale(1.05)" : "scale(1)",
            }}
          >
            {isConnected ? <Unplug className="!text-[var(--text)]" size={14} />
              :<Link className="!text-[var(--text)]" size={14} />}
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
          <button
            onClick={() => {
              setIsOpen(true);
                setPlatformToEdit(platform);
                handlEditClick(platform);
            }}
            className="px-4 bg-[var(--bgPage2)] text-14 rounded border !border-[var(--border)] !w-fit">
            Edit
          </button>
         
        </div>
        </div>
        {console.log("editingData:", editingData, platform)}
        {editingData.platformname == platform && <div className="flex items-center gap-2 mt-1">
          <span className="p-[2px] capitalize rounded-2xl text-12 border !border-[var(--border)] px-2 bg-[var(--bgPage2)]">{editingData.day[0]}</span>
          <span className="p-[2px] rounded-2xl text-12 border !border-[var(--border)] px-2 bg-[var(--bgPage2)]">
            {editingData.time.from.format("hh:mm A")} - {editingData.time.to.format("hh:mm A")}
          </span>
        </div>}
      </div>
    );
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3 w-100 !text-[var(--text)] !border !border-[var(--border)]  !bg-[var(--card)] rounded-2xl">
      <h2 className="h4 mb-0 !font-medium">
        {/* <i className="bi bi-share me-2 text-warning"></i> */}
        Social Media Profiles
      </h2>
      <p className="text-[var(--mutedText)] mb-4" style={{ fontSize: "0.95rem" }}>
        Connect your social media accounts
      </p>

      <Card className="rounded-0 !text-[var(--text)] !border-0  !bg-[var(--card)]">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-[var(--mutedText)]">Fetching social connections...</p>
            </div>
          ) : (
            ["instagram", "facebook", "youtube", "twitter"].map(renderRow)
          )}
        </Card.Body>
      </Card>
      <SocialMediaSettingsModal
        open={isOpen}
        platformName={platformToEdit}
        setEditingData={setEditingData}
        onCancel={() => setIsOpen(false)}
        onSave={(data) => {
          console.log("Saved Data:", data);
          setIsOpen(false);
        }}
      />
    </Container>
  );
};

export default SocialTab;
