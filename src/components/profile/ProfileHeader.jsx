import { Facebook, Instagram, MessageSquare, Share, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { ChatDots, BoxArrowUp } from "react-bootstrap-icons";

const ProfileHeader = ({ user, handleMessage }) => {
  const handleShare = async () => {
    const shareData = {
      title: user?.fullname || "User Profile",
      text: `Check out the profile of ${user?.fullname || "this user"}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // If Web Share API is supported
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div>
    <div
      style={{
        color: "#ffffff",
        padding: "20px 0",
      }}
        className="h-40 p-2 rounded-t-2xl relative flex justify-end items-end bg-gradient-to-r from-[#A5AFFE] via-[#7786FF] to-[#4E5BFF]"
    >
          <Button
            variant="light"
            size="sm"
            className="me-2 rounded !flex !items-center"
            onClick={handleMessage}
            disabled={!user}
          >
          <MessageSquare size={14} className="me-1" /> Message
          </Button>
          <Button
            variant="light"
            size="sm"
          className="rounded !flex !items-center"
            onClick={handleShare}
            disabled={!user}
          >
          <Share size={14} className="me-1" /> Share
          </Button>
      
        {/* <Col xs="auto">
          <Image
            src={user?.profile_pic || "https://picsum.photos/seed/user/80/80"}
            roundedCircle
            width={50}
            height={50}
            alt="User Avatar"
          />
        </Col>
        <Col>
          <h5 className="mb-0">{user?.fullname || "user123"}</h5>
          <small>{user?.email || "user123@gmail.com"}</small>
        </Col>
      
        <Col className="text-end">
          
        </Col> */}
      </div>
      <div className="p-2 h-34 md:flex !items-end justify-between relative">
        <div className="absolute top-[-50%] left-[2%] ">
          <Image
            src={user?.profile_pic || "https://picsum.photos/seed/user/80/80"}
            roundedCircle
            className="bg-[var(--bg)] p-1"
            width={120}
            height={120}
            alt="User Avatar"
          />
          </div>
        <div className="!text-[var(--text)] pl-8 !mt-13 mb-2 md:mb-0 md:!mt-5 xl:mt-0">
          <h5 className="mb-0">{user?.fullname || "user123"}</h5>
          <small>{user?.email || "user123@gmail.com"}</small>
        </div>
        <div className="flex justify-center items-center gap-2">
          <span className='p-2 !bg-pink-100 rounded-full'>
            <Instagram className="text-pink-500" size={18} />
          </span>
          <span className='p-2 bg-blue-100 rounded-full'>
            <Facebook className="text-blue-500" size={18} />
          </span>
          <span className='p-2 bg-red-100 rounded-full'>
            <Youtube className="text-red-500" size={18} />
          </span>
          <span className='p-2 bg-blue-100 rounded-full'>
            <Twitter className="text-blue-400" size={18} />

          </span>
        </div>
      </div>
    </div>

  );
};

export default ProfileHeader;
