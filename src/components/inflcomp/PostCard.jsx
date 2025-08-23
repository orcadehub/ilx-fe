import React from "react";
import { Card } from "react-bootstrap";
import {
  FaHeart,
  FaEye,
  FaComment,
  FaShare,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

// ✅ Number formatting helper (same as your design)
const formatNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num?.toString() || "0";
};

// ✅ Platform-specific icons with same colors/gradient
const getPlatformIcon = (platform) => {
  switch (platform) {
    case "instagram":
      return (
        <FaInstagram
          style={{
            background:
              "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FCAF45)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        />
      );
    case "facebook":
      return <FaFacebook style={{ color: "#1877F2" }} />; // Facebook blue
    case "twitter":
      return <FaTwitter style={{ color: "#1DA1F2" }} />; // Twitter blue
    case "youtube":
      return <FaYoutube style={{ color: "#FF0000" }} />; // YouTube red
    default:
      return null;
  }
};

const PostCard = ({ post }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      {post.image && (
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={post.image}
            height="140"
            className="rounded-top object-fit-cover"
          />
          <span
            className="position-absolute top-0 end-0 m-1 rounded-circle p-1"
            style={{ fontSize: "1.2rem" }}
          >
            {getPlatformIcon(post.platform)}
          </span>
        </div>
      )}
      <Card.Body className="p-3">
        <div className="d-flex justify-content-around small text-muted">
          <div>
            <FaHeart className="text-danger" /> {formatNumber(post.likes)}
          </div>
          <div>
            <FaEye /> {formatNumber(post.views)}
          </div>
          <div>
            <FaComment /> {formatNumber(post.comments)}
          </div>
          <div>
            <FaShare /> {formatNumber(post.shares)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
