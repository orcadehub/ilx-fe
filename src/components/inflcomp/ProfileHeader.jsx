import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaHeart,
  FaComment,
  FaShareAlt,
} from "react-icons/fa";

const formatFollowers = (num) => {
  if (!num) return "0";
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
};

const ProfileHeader = ({
  selected,
  isWishlisted,
  toggleWishlist,
  navigate,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 shadow-sm p-3 bg-white rounded-4 mb-4">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <img
          src={selected.profilePic}
          className="rounded border border-1"
          width="70"
          height="70"
          alt="Profile"
        />
        <div>
          <h5 className="fw-semibold mb-1 d-flex align-items-center gap-3">
            {selected.name}
            <FaHeart
              style={{
                cursor: "pointer",
                color: isWishlisted[selected.id] ? "#dc3545" : "#b6b6b6",
                transition: "all 0.2s ease",
              }}
              onClick={() => toggleWishlist(Number(selected.id))}
            />

            <FaComment
              className="text-primary cursor-pointer"
              title="Chat"
              onClick={() => navigate(`/dashboard/chats/${selected.id}`)}
            />
            <FaShareAlt
              className="text-secondary cursor-pointer"
              title="Share"
            />
          </h5>
          <div className="text-muted small">@{selected.username}</div>
        </div>
      </div>

      <div className="d-flex gap-4 flex-wrap text-center">
        <div>
          <FaInstagram color="#E1306C" size={26} />
          <div className="fw-bold">
            {formatFollowers(selected.data?.instagram?.total_followers)}
          </div>
        </div>
        <div>
          <FaFacebook color="#1877F2" size={26} />
          <div className="fw-bold">
            {formatFollowers(selected.data?.facebook?.total_followers)}
          </div>
        </div>
        <div>
          <FaYoutube color="#FF0000" size={26} />
          <div className="fw-bold">
            {formatFollowers(selected.data?.youtube?.total_followers)}
          </div>
        </div>
        <div>
          <FaTwitter color="#1DA1F2" size={26} />
          <div className="fw-bold">
            {formatFollowers(selected.data?.twitter?.total_followers)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
