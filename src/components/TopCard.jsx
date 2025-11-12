import React from 'react'

const TopCard = ({ topData }) => {
  return (
      <>
          <div className="space-y-5">
              {topData.map((influencer) => (
                  <div
                      key={influencer.id}
                      className="flex items-center justify-between"
                  >
                      <div className="flex items-center gap-3">
                          <img
                              src={influencer.profilePic}
                              alt={influencer.name}
                              className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="gap-0">
                              <p className="text-sm font-medium !text-[var(--text)] !mb-1">
                                  {influencer.name}
                              </p>
                              <p className="text-xs text-gray-500 !mb-1">
                                  {influencer.username}
                              </p>
                          </div>
                      </div>
                      <p className="text-sm font-semibold text-[var(--text)]">
                          {influencer.orders} orders
                      </p>
                  </div>
              ))}
          </div></>
  )
}

export default TopCard