import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

const FeatureCardIcon = ({ icon }) => (
  <div
    style={{
      background: "#e4ebfa",
      borderRadius: "12px",
      width: "42px",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "18px",
    }}
  >
    {icon}
  </div>
);

const FeatureCards = ({ featuresData }) => (
  <div className="container my-4"> {/* Added Bootstrap container class here */}
    <Row className="g-4">
      {featuresData.map((feature, idx) => (
        <Col key={idx} xs={12} sm={6} lg={4}>
          <Card
            className="h-100 border-0"
            style={{
              borderRadius: "18px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px 0 #eaeef7",
            }}
          >
            <Card.Body style={{ padding: "30px" }}>
              <FeatureCardIcon icon={feature.icon} />
              <Card.Title
                className="fw-semibold mb-2"
                style={{ color: "#222", fontSize: "1.2rem" }}
              >
                {feature.title}
              </Card.Title>
              {feature.description && (
                <Card.Text
                  style={{
                    color: "#5f7596",
                    fontSize: "0.99rem",
                    minHeight: "52px",
                    marginBottom: "18px",
                  }}
                >
                  {feature.description}
                </Card.Text>
              )}
              <ListGroup variant="flush">
                {feature.points.map((point, index) => (
                  <ListGroup.Item
                    key={index}
                    className="ps-0 border-0"
                    style={{
                      color: "#556080",
                      fontSize: "0.94rem",
                      background: "transparent",
                      paddingLeft: 0,
                    }}
                  >
                    <span
                      style={{
                        color: "#4a90e2",
                        fontWeight: "bold",
                        marginRight: "8px",
                        fontSize: "1.2em",
                        display: "inline-block",
                        marginTop: "-1px",
                      }}
                    >
                      •
                    </span>
                    {point}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default FeatureCards;
