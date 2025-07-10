import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Badge,
  Dropdown,
  ButtonGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaEllipsisV,
  FaUserCircle,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import "./Dash.css";

const AdminBusinUsers = () => {
  const navigate = useNavigate();

  const [businessUsers, setBusinessUsers] = useState([
    {
      id: 1,
      profilePic: "",
      fullName: "Priya Sharma",
      username: "priya_summer",
      email: "priya@gmail.com",
      joinedDate: "2023-05-10",
      status: "active",
      tags: ["verified", "sponsored"],
    },
    {
      id: 2,
      profilePic: "",
      fullName: "Amit Verma",
      username: "amit_v",
      email: "amit@gmail.com",
      joinedDate: "2023-06-12",
      status: "inactive",
      tags: ["premium"],
    },
    {
      id: 3,
      profilePic: "",
      fullName: "Rohini Das",
      username: "rohini_d",
      email: "rohini@gmail.com",
      joinedDate: "2023-04-08",
      status: "blocked",
      tags: ["enterprise", "verified"],
    },
    {
      id: 4,
      profilePic: "",
      fullName: "Kunal Mehta",
      username: "kunal_mehta",
      email: "kunal@gmail.com",
      joinedDate: "2023-07-15",
      status: "active",
      tags: ["toprated"],
    },
    {
      id: 5,
      profilePic: "",
      fullName: "Sneha Kapoor",
      username: "sneha_kapoor",
      email: "sneha@gmail.com",
      joinedDate: "2023-08-20",
      status: "active",
      tags: ["sponsored"],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tagIcons = {
    verified: <FaCheckCircle className="me-1 text-success" />,
    sponsored: <FaStar className="me-1 text-warning" />,
  };

  const allTags = [
    "verified",
    "sponsored",
    "toprated",
    "premium",
    "enterprise",
  ];

  const statusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "blocked":
        return "danger";
      default:
        return "secondary";
    }
  };

  const openModal = (type, user) => {
    setSelectedUser(user);
    setEditData({
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });
    setSelectedTags(user.tags || []);
    if (type === "edit") setShowEditModal(true);
    if (type === "block") setShowBlockModal(true);
    if (type === "tags") setShowTagsModal(true);
    if (type === "delete") setShowDeleteModal(true);
  };

  const handleCloseAll = () => {
    setShowEditModal(false);
    setShowBlockModal(false);
    setShowTagsModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleEditSave = () => {
    setBusinessUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, ...editData } : user
      )
    );
    handleCloseAll();
  };

  const handleTagsSave = () => {
    setBusinessUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, tags: selectedTags } : user
      )
    );
    handleCloseAll();
  };

  const handleDelete = () => {
    setBusinessUsers((prev) =>
      prev.filter((user) => user.id !== selectedUser.id)
    );
    handleCloseAll();
  };

  const handleBlock = (duration) => {
    setBusinessUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id ? { ...user, status: "blocked" } : user
      )
    );
    handleCloseAll();
  };

  return (
    <>
      <Card className="shadow-sm border-0 pending-orders-card">
        <Card.Body>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
            <h5 className="fw-bold mb-2 mb-sm-0">👤 Business Users</h5>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => navigate("/dashboard/business-users")}
            >
              View All
            </button>
          </div>
          <Table
            hover
            responsive
            className="align-middle"
            style={{ minWidth: 1000 }}
          >
            <thead>
              <tr>
                <th>Profile</th>
                <th>Username</th>
                <th>Email</th>
                <th>Joined</th>
                <th style={{ width: "220px" }}>Tags</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {businessUsers.map((user) => (
                <tr key={user.id}>
                  <td className="d-flex align-items-center gap-2">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="avatar"
                        className="rounded-circle"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <FaUserCircle size={40} className="text-secondary" />
                    )}
                    <div>{user.fullName}</div>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.joinedDate}</td>
                  <td style={{ minWidth: "220px", whiteSpace: "nowrap" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        gap: "6px",
                      }}
                    >
                      {user.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          bg="light"
                          text="dark"
                          className="border"
                          style={{
                            fontSize: "0.7rem",
                            padding: "4px 8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tagIcons[tag]} {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td>
                    <Badge bg={statusVariant(user.status)}>{user.status}</Badge>
                  </td>
                  <td>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        variant="light"
                        className="shadow-sm border-0"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => openModal("edit", user)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => openModal("block", user)}>
                          Block
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => openModal("tags", user)}>
                          Manage Tags
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => openModal("delete", user)}
                          className="text-danger"
                        >
                          Delete User
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={editData.username}
                onChange={(e) =>
                  setEditData({ ...editData, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Block Modal */}
      <Modal show={showBlockModal} onHide={handleCloseAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Block User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select block duration:</p>
          {["1 day", "3 days", "7 days", "10 days", "Permanent"].map((d) => (
            <Button
              key={d}
              variant="outline-danger"
              className="me-2 mb-2"
              onClick={() => handleBlock(d)}
            >
              {d}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Tags Modal */}
      <Modal show={showTagsModal} onHide={handleCloseAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Manage Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allTags.map((tag) => (
            <Form.Check
              key={tag}
              type="checkbox"
              label={
                <span>
                  {tagIcons[tag]} {tag}
                </span>
              }
              checked={selectedTags.includes(tag)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...selectedTags, tag]
                  : selectedTags.filter((t) => t !== tag);
                setSelectedTags(updated);
              }}
              className="mb-2"
            />
          ))}
          <Button variant="success" onClick={handleTagsSave}>
            Save Tags
          </Button>
        </Modal.Body>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selectedUser?.fullName}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAll}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminBusinUsers;
