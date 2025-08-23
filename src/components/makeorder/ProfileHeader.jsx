// src/components/ProfileHeader.js
import React from "react";
import { Card } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaHeart,
  FaComment,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const selected = { /* Mock data, replace with actual state */
    profilePic: "https://via.placeholder.com/100",
    name: "Unknown User",
    username: "username",
    stats: { instagram: "0", youtube: "0", twitter: "0" },
    data: { facebook: { friends: { summary: { total_count: "0" } } } },
  };
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const toggleWishlist = () => setIsWishlisted((prev) => !prev);

  return (
    <Card className="mb-4 rounded-4 border-0 p-3 bg-white shadow-sm">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <img
            src={selected.profilePic}
            className="rounded-circle border border-1"
            width="100"
            height="100"
            alt="Profile"
          />
          <div>
            <h5 className="fw-semibold mb-1">{selected.name}</h5>
            <div className="text-muted small">@{selected.username}</div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <FaHeart
            style={{
              cursor: "pointer",
              color: isWishlisted ? "#e63946" : "#6b7280",
              transition: "all 0.2s ease",
            }}
            onClick={toggleWishlist}
          />
          <FaComment
            style={{ cursor: "pointer", color: "#6b7280" }}
            onClick={() => navigate(`/dashboard/chats/${selected.id}`)}
          />
          <FaShareAlt style={{ cursor: "pointer", color: "#6b7280" }} />
        </div>
      </div>
      <div className="d-flex justify-content-around mt-4 flex-wrap gap-3">
        <div className="text-center">
          <FaInstagram color="#833AB4" size={26} />
          <div className="fw-bold">{selected.stats?.instagram || "0"}</div>
        </div>
        <div className="text-center">
          <FaFacebook color="#3B5998" size={26} />
          <div className="fw-bold">
            {selected.data?.facebook?.friends?.summary?.total_count ?? "0"}
          </div>
        </div>
        <div className="text-center">
          <FaYoutube color="#C4302B" size={26} />
          <div className="fw-bold">{selected.stats?.youtube || "0"}</div>
        </div>
        <div className="text-center">
          <FaTwitter color="#00ACEE" size={26} />
          <div className="fw-bold">{selected.stats?.twitter || "0"}</div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;