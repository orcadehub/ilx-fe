// src/components/ServicesTab.js
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import {
  Heart,
  ChatDots,
  BoxArrowUp,
  Eye,
  Instagram,
  Facebook,
  Link as LinkIcon,
} from "react-bootstrap-icons";
import axios from "axios";
import config from "../../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const iconComponents = {
  instagram: <Instagram />,
  facebook: <Facebook />,
  link: <LinkIcon />,
};

const ServicesTab = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const localUserString = localStorage.getItem("user");
        const localUser = JSON.parse(localUserString);
        if (!localUser || !localUser.email) {
          setError("User not logged in or email missing");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${baseURL}/api/user/${localUser.id}`
        );
        const userData = response.data;

        if (!userData.posts || typeof userData.posts !== "object") {
          setError("No posts found for this user");
          setIsLoading(false);
          return;
        }

        const allPosts = Object.keys(userData.posts).flatMap((platform) =>
          userData.posts[platform].map((post) => ({
            ...post,
            platform,
          }))
        );

        setPosts(allPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-3">
      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoading && !error && (
        <Row className="g-3">
          {posts.map((post) => (
            <Col md={4} key={post.id}>
              <Card className="border-0 shadow-sm rounded">
                <div className="position-relative">
                  <Card.Img variant="top" src={post.media_url} />
                  <div className="position-absolute top-0 end-0 p-1">
                    <span className="bg-light rounded-circle p-1 me-1">
                      {iconComponents[post.platform.toLowerCase()]}
                    </span>
                    {post.permalink && (
                      <span className="bg-light rounded-circle p-1">
                        <LinkIcon />
                      </span>
                    )}
                  </div>
                </div>
                <Card.Footer className="d-flex justify-content-around bg-white">
                  <span>
                    <Heart fill="red" /> {post.likes}
                  </span>
                  <span>
                    <ChatDots fill="green" /> {post.comments}
                  </span>
                  <span>
                    <BoxArrowUp fill="orange" /> {post.shares}
                  </span>
                  <span>
                    <Eye fill="blue" /> {post.views}
                  </span>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ServicesTab;