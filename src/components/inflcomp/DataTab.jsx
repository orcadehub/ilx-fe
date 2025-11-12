import React from "react";
import { Row, Col } from "react-bootstrap";
import EngagementChart from "./EngagementChart";
import PerformanceChart from "./PerformanceChart";
import SocialAnalyticsCharts from "./SocialAnalyticsCharts";

const DataTab = ({ selected }) => {
  // Aggregate data from posts
  const aggregatePostsData = () => {
    if (!selected?.posts || selected.posts.length === 0) {
      return { totalPosts: 0, totalLikes: 0, totalViews: 0, totalComments: 0, totalShares: 0, avgLikes: 0, avgViews: 0, avgComments: 0, avgShares: 0 };
    }

    const totalPosts = selected.posts.length;
    const totalLikes = selected.posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    const totalViews = selected.posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalComments = selected.posts.reduce((sum, post) => sum + (post.comments || 0), 0);
    const totalShares = selected.posts.reduce((sum, post) => sum + (post.shares || 0), 0);

    return {
      totalPosts, totalLikes, totalViews, totalComments, totalShares,
      avgLikes: Math.round(totalLikes / totalPosts),
      avgViews: Math.round(totalViews / totalPosts),
      avgComments: Math.round(totalComments / totalPosts),
      avgShares: Math.round(totalShares / totalPosts)
    };
  };

  const postsData = aggregatePostsData();
  
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const stats = {
    'Total Posts': postsData.totalPosts,
    'Total Campaigns': selected?.data?.totalCampaigns || 0,
    'Avg Likes': formatNumber(postsData.avgLikes),
    'Avg Views': formatNumber(postsData.avgViews),
    'Avg Comments': postsData.avgComments,
    'Avg Shares': postsData.avgShares,
    'Engagement Rate': selected?.data?.engagement || '0%',
    'Fake Followers': selected?.data?.fakeFollowers || '0%'
  };

  const platformData = selected?.posts ? 
    selected.posts.reduce((acc, post) => {
      const platform = post.platform;
      if (!acc[platform]) acc[platform] = { posts: 0, likes: 0, views: 0, comments: 0 };
      acc[platform].posts += 1;
      acc[platform].likes += post.likes || 0;
      acc[platform].views += post.views || 0;
      acc[platform].comments += post.comments || 0;
      return acc;
    }, {}) : {};

  return (
    <div className="w-100 overflow-auto h-[calc(100vh-425px)] px-2">
      {/* Stats Cards Grid */}
      <div className="mb-4">
        <Row className="g-3 g-md-4 mx-0">
          {Object.entries(stats).map(([label, value]) => (
            <Col xs={6} sm={4} md={3} lg={2} xl={3} key={label} className="px-2">
              <div className="border !border-[var(--border)] rounded-xl p-2 p-md-3 text-center hover:shadow-xl bg-[var(--bgPage2)] transition-all duration-200">
                <div className="  !font-medium text-[var(--text)] text-[22px] 2xl:!text-[30px]">
                  {typeof value === "object"
                    ? value?.name || value?.id || JSON.stringify(value)
                    : value}
                </div>
                <div className="small text-[var(--mutedText)] text-14">
                  {label
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Charts Section - Same Line */}
      <Row className="g-3 g-md-4 mx-0">
        {/* Area Chart */}
        <Col xs={12} lg={6} className="px-2">
          <div className="border !border-[var(--border)] rounded-xl bg-[var(--bgPage2)]">
            <EngagementChart platformData={platformData} />
          </div>
        </Col>

        {/* Pie Chart */}
        <Col xs={12} lg={6} className="px-2">
          <div className="border !border-[var(--border)] rounded-xl bg-[var(--bgPage2)]">
            <PerformanceChart platformData={platformData} />
          </div>
        </Col>

        <SocialAnalyticsCharts platformData={platformData} />
      </Row>
    </div>
  );
};

export default DataTab;
