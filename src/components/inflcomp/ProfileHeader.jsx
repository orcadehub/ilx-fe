import { Dot, Heart, MessageCircle, Share2 } from "lucide-react";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../config";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaHeart,
  FaComment,
  FaShareAlt,
} from "react-icons/fa";

const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;

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
  onActionUpdate
}) => {


  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseURL}/api/wishlist`, 
        { influencerId: selected.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        toggleWishlist && toggleWishlist(selected.id);
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };
  return (
    <div className="!flex items-center !justify-between flex-wrap gap-3  rounded-4 mb-4">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <img
          src={selected.profilePic}
          className="rounded-pill border !border-[var(--border)]"
          width="60"
          height="60"
          alt="Profile"
        />
        <div>
          {console.log("Selected:", selected)}
          <h5 className="fw-semibold mb-1 d-flex align-items-center gap-3 !text-[var(--text)]">
            {selected.name}
           
            <Heart 
              size={18} 
              className={`cursor-pointer ${selected.wishlist ? "text-red-500 fill-red-400" : "!text-[var(--text)]"}`}
              title={selected.wishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={handleWishlist}
            />



            <MessageCircle 
              className="!text-[var(--text)] cursor-pointer"
              title="Chat"
              size={18}
              onClick={() => navigate(`/dashboard/chats/${selected.id}`)}
            />
          </h5>
          <div className="text-gray-500 flex !items-center gap-2">
            <span>
              {/* @{selected.username}    */}
              {selected?.category}
            </span>
            <span className="flex">
              <Dot /> {selected?.location_city || 'Location not specified'}, {selected?.location_state || ''}
            </span>
            <Share2
              className="!text-[var(--text)]"
              title="Share"
              size={14}
            />
          </div>
        </div>
      </div>

      <div className="d-flex !justify-center md:justify-end items-center  !w-full md:!w-fit gap-5 md:gap-4 flex-wrap text-center">
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
