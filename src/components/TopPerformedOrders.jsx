import React from 'react'
import { useNavigate } from 'react-router-dom';
import { pendingOrders, topPerformOrders } from '../data/topInflencersData';
import NewTable from './NewTable';
import { ChartNoAxesColumn, Eye, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { FaArrowRight } from 'react-icons/fa';

const TopPerformedOrders = ({ loadingTop }) => {
    const navigate = useNavigate();

    const columns = [
        {
            title: (
                <div className="text-14 text-gray-500">
                    Order </div>
            ),
            dataIndex: "infname",
            key: "infname",
            width: "20%",
            render: (text) => <span className="capitalize text-12 !font-semibold">{text}</span>,
        },
        {
            title: <div className="text-14 text-gray-500">Platform</div>,
            dataIndex: "platform",
            key: "platform",
            align:"center",
            // width: "16%",
            render: (platforms) => (
                <div className="flex gap-2 justify-center !items-center">
                    {platforms?.map((platform, idx) => {
                        switch (platform.toLowerCase()) {
                            case "instagram":
                                return <Instagram key={idx} size={15} className="text-pink-500" />;
                            case "facebook":
                                return <Facebook key={idx} size={15} className="text-blue-600" />;
                            case "youtube":
                                return <Youtube key={idx} size={15} className="text-red-500" />;
                            case "twitter":
                                return <Twitter key={idx} size={15} className="text-sky-500" />;
                            default:
                                return (
                                    <span
                                        key={idx}
                                        className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                                    >
                                        {platform}
                                    </span>
                                );
                        }
                    })}
                </div>
            ),
        },
        {
            title: <div className="text-14 text-gray-500">Type</div>,
            dataIndex: "type",
            key: "type",
            align: "center",
            render: (types) => {
                const typeColors = {
                    reel: "bg-purple-100 text-purple-700",
                    video: "bg-red-100 text-red-700",
                    post: "bg-blue-100 text-blue-700",
                    story: "bg-green-100 text-green-700",
                };

                return (
                    <div className="flex gap-2 flex-wrap justify-center ">
                        {Array.isArray(types) &&
                            types.map((text, index) => {
                                const classes = typeColors[text?.toLowerCase()] || "bg-gray-100 text-gray-700";
                                return (
                                    <span
                                        key={index}
                                        className={`capitalize text-[10px] font-semibold  px-[5px] py-[1px] rounded-md  ${classes}`}
                                    >
                                        {text}
                                    </span>
                                );
                            })}
                    </div>
                );
            },
        },
        {
            title: <div className="text-14 text-gray-500">Performance</div>,
            dataIndex: "performance",
            key: "performance",
            align:"center",
            render: (text) => <span className="capitalize text-12 text-green-600 font-semibold">{text}%</span>,
        },

    ];

    const dataSource = (topPerformOrders || []).map((c) => ({ ...c, key: c._id }));

  return (
      <>
          <div className="lg:col-span-2">
              {topPerformOrders && topPerformOrders.length === 0 ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      <span className="ml-3 text-slate-600">Loading top orders...</span>
                  </div>
              ) : (
                  <div>
                      <div className="shadow-sm h-full border !border-[var(--border)] !bg-[var(--card)] rounded-xl text-[var(--text)]">
                          <div className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                  <h5 className="font-semibold mb-0  !text-[16px] flex !items-center">
                                      <ChartNoAxesColumn className='!text-blue-500 mr-1' />Top Performed Orders</h5>
                                  <button
                                      className="inline-flex items-center !rounded-lg !text-[12px] text-slate-80 hover:text-blue"
                                      onClick={() => navigate("/dashboard/orders")}
                                  >
                                      View All <FaArrowRight className="ml-2" size={10} />
                                  </button>
                              </div>
                                  <div className=" rounded-md max-h-[300px] overflow-y-auto !bg-[var(--card)]">
                                      <NewTable columns={columns} dataSource={dataSource} />
                              </div>
                          </div>
                      </div>
                  </div>
              )}
          </div></>
  )
}

export default TopPerformedOrders