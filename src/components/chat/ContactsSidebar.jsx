import React, { useEffect } from "react";
import { ListGroup, Form } from "react-bootstrap";

const ContactsSidebar = ({
  contacts,
  searchTerm,
  onSearchChange,
  active,
  onSelectContact,
}) => {
  // Auto-select the first contact when contacts load and no active contact is set
  useEffect(() => {
    if (contacts.length > 0 && !active) {
      onSelectContact(contacts[0]);
    }
  }, [contacts, active, onSelectContact]);

  return (
    <>
      <div className="px-4 py-3 border-bottom bg-white">
        <h5 className="mb-0 fw-bold fs-4 text-dark">Chats</h5>
      </div>
      <div className="p-3 border-bottom bg-white">
        <Form.Control
          placeholder="Search..."
          className="rounded-pill border border-dark shadow-sm"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <ListGroup
        variant="flush"
        style={{ overflowY: "auto", height: "calc(100vh - 250px)" }}
      >
        {contacts
          .filter((c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((c) => (
            <ListGroup.Item
              key={c.id}
              onClick={() => onSelectContact(c)}
              className="d-flex align-items-center gap-3 px-3 py-3 border-0 border-bottom"
              style={{
                cursor: "pointer",
                backgroundColor:
                  active?.id === c.id ? "#e0e7ff" : "transparent",
              }}
            >
              <img
                src={c.avatar}
                alt="avatar"
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex justify-content-between">
                  <div className="fw-semibold text-dark text-truncate">
                    {c.name}
                  </div>
                  <div className="text-muted small">
                    {c.timestamp?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="text-muted small text-truncate">
                  {c.preview}
                </div>
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default ContactsSidebar;
