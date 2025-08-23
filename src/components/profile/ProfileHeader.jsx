// src/components/ProfileHeader.js
import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { ChatDots, BoxArrowUp } from "react-bootstrap-icons";

const ProfileHeader = ({ user, handleMessage }) => (
  <div
    style={{
      background: "linear-gradient(to right, #605cff, #4a00e0)",
      color: "#ffffff",
      padding: "20px 0",
      borderBottomLeftRadius: "20px",
      borderBottomRightRadius: "20px",
    }}
  >
    <Row className="align-items-center mx-4">
      <Col xs="auto">
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
        <Button
          variant="light"
          size="sm"
          className="me-2 rounded-pill"
          onClick={handleMessage}
          disabled={!user}
        >
          <ChatDots className="me-1" /> Message
        </Button>
        <Button variant="light" size="sm" className="rounded-pill">
          <BoxArrowUp className="me-1" /> Share
        </Button>
      </Col>
    </Row>
  </div>
);

export default ProfileHeader;