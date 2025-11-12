import React from 'react'

const TabsButton = ({ data, activeKey, setActiveKey, wfit }) => {
    return (
        <div className="tabs-scroll-wrap">
            <div className={`mb-3 flex gap-3 !bg-[var(--hover2)] p-1 rounded-xl tabs-scroll-inner ${wfit ? '!w-fit' : '!w-full'}`}
                style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                {data.map(
                    (tab) => (
                        <button
                            key={tab.key}
                            className={`btn flex-1 text-center !font-medium text-14 py-1 border-0 !text-[var(--mutedText)] ${activeKey === tab.key
                                ? " border-bottom border-2 border-primary !bg-[var(--bg)] text-[var(--text)]"
                                : ""
                                } `}
                            onClick={() => {
                                setActiveKey(tab.key);
                            }}
                        >
                            <span className="me-2 flex items-center justify-center gap-2 !w-full">
                                {tab.icon ? tab.icon : ''}
                                {tab.label}
                            </span>
                        </button>
                    )
                )}
            </div>
            <style>{`
                .tabs-scroll-wrap {
                    width: 100%;
                    overflow-x: auto;
                }
                .tabs-scroll-inner {
                    flex-wrap: nowrap !important;
                    overflow-x: auto;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .tabs-scroll-inner::-webkit-scrollbar {
                    display: none;
                }
                .tabs-btn-item {
                    flex: 0 0 auto;
                }
                @media (max-width: 700px) {
                    .tabs-scroll-wrap {
                        width: 90vw !important;
                        margin-left: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        position: static !important;
                    }
                    .tabs-scroll-inner {
                        gap: 8px !important;
                        padding-bottom: 2px;
                        width: 100vw !important;
                        min-width: 100vw !important;
                    }
                    .tabs-btn-item {
                        min-width: 110px;
                        font-size: 13px;
                        padding-left: 10px;
                        padding-right: 10px;
                    }
                }
            `}</style>
        </div>
    )
}

export default TabsButton