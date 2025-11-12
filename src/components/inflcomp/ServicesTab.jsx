import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import PostCard from "./PostCard";
import { Select, Radio } from "antd";

const { Option } = Select;

const ServicesTab = ({ selected }) => {
  // Map posts from the API response
  const posts = selected.posts ? selected.posts.map((post) => ({
    platform: post.platform,
    id: post.id,
    created_time: post.posted_at || new Date().toISOString(),
    image: post.thumbnail,
    likes: post.likes || 0,
    views: post.views || 0,
    comments: post.comments || 0,
    shares: post.shares || 0,
    saves: 0,
    type: post.type,
    title: `${post.platform} ${post.type}`,
    description: `Engagement: ${post.likes} likes, ${post.comments} comments`,
    permalink: post.url,
  })) : [];


  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const platforms = ["All", "Instagram", "Facebook", "YouTube", "Twitter"];
  const handleChangePlatforms = (value) => {
    setSelectedPlatform(value);
  };

  const [selectedType, setSelectedType] = useState("Post Image/Video");

  const options = [
    "Post Image/Video",
    "Reels/Shorts",
    "Story (Image/Video)",
    "In-Video Promotion (<10 min)",
  ];

  const handleChange = (value) => {
    setSelectedType(value);
  };
  return (
    <div>
      <div className="flex justify-end items-center gap-2">
      <div className="w-[170px]">
        <Select
          value={selectedPlatform}
            onChange={handleChangePlatforms}
            className="w-full"
            disabled={posts.length === 0}
          dropdownRender={() => (
            <div className="!p-2 border !border-[var(--border)] !rounded">
              <Radio.Group
                onChange={(e) => handleChangePlatforms(e.target.value)}
                value={selectedPlatform}
                className="flex flex-col !text-[var(--text)] "
              >
                {platforms.map((platform) => (
                  <Radio className="hover:bg-[var(--hover)] p-1 rounded !w-full !text-[var(--text)]" key={platform} value={platform}>
                    {platform}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          )}
        >
          {platforms.map((platform) => (
            <Option key={platform} value={platform}>
              {platform}
            </Option>
          ))}
        </Select>
      </div>
        <div className="w-[200px]">
          <Select
            value={selectedType}
            onChange={handleChange}
            className="w-full"
            disabled={posts.length === 0}
            dropdownRender={() => (
              <div className="!p-2 border !border-[var(--border)] !rounded">
                <Radio.Group
                  onChange={(e) => handleChange(e.target.value)}
                  value={selectedType}
                  className="flex flex-col !text-[var(--text)] "
                >
                  {options.map((opt) => (
                    <Radio className="hover:bg-[var(--hover)] p-1 rounded !w-full !text-[var(--text)]" key={opt} value={opt}>
                      {opt}
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
          >
            {options.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    
      {(posts.length === 0) ?
        <Col>
          <div className="text-center !text-[var(--text)] flex justify-center items-center h-62">No posts available.</div>
        </Col> :
      
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
          {posts.map((post, index) => (
            <div key={index}>
              <PostCard post={post} />
            </div>
          ))}
        </div>}
    </div>
  );
};

export default ServicesTab;