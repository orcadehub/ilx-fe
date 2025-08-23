import React from "react";
import { Row, Col } from "react-bootstrap";
import PostCard from "./PostCard";

const ServicesTab = ({ selected }) => {
  const posts = [];

  // Facebook Posts
  if (selected.posts?.facebook) {
    posts.push(
      ...selected.posts.facebook.map((fb) => ({
        platform: "facebook",
        id: fb.id,
        created_time: fb.posted_at,
        image: fb.media_url,
        likes: fb.likes || 0,
        views: fb.views || 0,
        comments: fb.comments || 0,
        shares: fb.shares || 0,
        saves: fb.saves || 0,
        type: fb.type,
        title: fb.title,
        description: fb.description,
        permalink: fb.permalink,
      }))
    );
  }

  // YouTube Posts
  if (selected.posts?.youtube) {
    posts.push(
      ...selected.posts.youtube.map((yt) => ({
        platform: "youtube",
        id: yt.id,
        created_time: yt.posted_at,
        image: yt.media_url,
        likes: yt.likes || 0,
        views: yt.views || 0,
        comments: yt.comments || 0,
        shares: yt.shares || 0,
        saves: yt.saves || 0,
        type: yt.type,
        title: yt.title,
        description: yt.description,
        permalink: yt.permalink,
      }))
    );
  }

  // Instagram Posts
  if (selected.posts?.instagram) {
    posts.push(
      ...selected.posts.instagram.map((ig) => ({
        platform: "instagram",
        id: ig.id,
        created_time: ig.posted_at,
        image: ig.media_url,
        likes: ig.likes || 0,
        views: ig.views || 0,
        comments: ig.comments || 0,
        shares: ig.shares || 0,
        saves: ig.saves || 0,
        type: ig.type,
        title: ig.title,
        description: ig.description,
        permalink: ig.permalink,
      }))
    );
  }

  // Twitter Posts
  if (selected.posts?.twitter) {
    posts.push(
      ...selected.posts.twitter.map((tw) => ({
        platform: "twitter",
        id: tw.id,
        created_time: tw.posted_at,
        image: tw.media_url,
        likes: tw.likes || 0,
        views: tw.views || 0,
        comments: tw.comments || 0,
        shares: tw.shares || 0,
        saves: tw.saves || 0,
        type: tw.type,
        title: tw.title,
        description: tw.description,
        permalink: tw.permalink,
      }))
    );
  }

  // Sort posts by newest first
  posts.sort((a, b) => new Date(b.created_time) - new Date(a.created_time));

  if (posts.length === 0) {
    return (
      <Col>
        <div className="text-center text-muted">No posts available.</div>
      </Col>
    );
  }

  return (
    <Row className="g-4">
      {posts.map((post, index) => (
        <Col xs={12} sm={6} md={4} key={index}>
          <PostCard post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default ServicesTab;