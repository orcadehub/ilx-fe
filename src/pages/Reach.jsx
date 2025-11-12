import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { reachData } from '../data/reachData';
import { Tooltip } from "antd";
import { Info } from 'lucide-react';
import CountUp from 'react-countup';
import { EngagementChart } from '../components/reachChart/PlatformEngagementComparison';
import { ReachImpressionsChart } from '../components/reachChart/ReachandImpressions';
import { DemographicsChart } from '../components/reachChart/AudienceDemographics';
import { PaidVsOrganicChart } from '../components/reachChart/PaidvsOrganicAnalytics';
import { CpeCpmChart } from '../components/reachChart/CPEandCPMChart';
import { ClicksChart } from '../components/reachChart/ClicksBarChart';
import { ReachVsViewsChart } from '../components/reachChart/ViewsAnalysisLine Chart';
import DualDropdown from '../components/reachChart/DualDropdown';

const Reach = () => {
  return (
    <div className='bg-[var(--bgPage2)] min-h-[90vh]  px-3 md:p-5 '>

      <DualDropdown />
      {/* <Typography variant="h4" gutterBottom>Reach Analytics</Typography>
      <Paper className='!bg-[var(--bgPage)] border !border-[var(--border)] !text-[var(--text)] !rounded-xl' elevation={2} sx={{ p: 2 }}>
        <Typography>Reach, impressions, engagement, and growth metrics of influencer campaigns will be visualized here.</Typography>
      </Paper> */}
      {/* Metrics Section */}
      {reachData.length === 0 ? (
        <div className="px-3 my-3">
          <div className="flex justify-center items-center min-h-[120px]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="ml-3 text-slate-600">Loading metrics...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xl:gap-4 py-5">
            {reachData.length > 0 ? (
              reachData.map((card) => (
              <div
                key={card.title}
                // onClick={() => navigate(card.path)}
                className="hover:shadow-lg border  !border-[var(--border)] bg-[var(--card)] cursor-pointer rounded-xl p-4 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-14 text-[var(--mutedText)] font-normal">
                    <span>{card.title}</span>
                    {card.infoText && (
                      <Tooltip
                        placement="top"
                        title={card.infoText}
                        color="geekblue"
                      >
                        <Info size={14} className="ml-1 cursor-pointer flex-shrink-0" />
                      </Tooltip>
                    )}
                  </div>
                  <div className="text-blue flex items-center">{card.icon}</div>
                </div>

                {/* Value */}
                <h5
                  className={`!font-bold !text-[25px] `}
                >
                    <CountUp
                      start={0}
                      end={parseInt(card.value, 10) || 0}
                      duration={2}
                      separator=","
                    />
                </h5>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-[var(--mutedText)]">
              No metrics available
            </p>
          )}
          </div>
          
      )}

      
      {/* Graphs sections  */}
      <div className="grid grid-cols-1 gap-4 ">
        {/* Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 gap-3 xl:gap-6 ">
          <div className="lg:col-span-1 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <EngagementChart />
        </div>
          <div className="lg:col-span-1 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <ReachImpressionsChart />
        </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-6 ">
        <div className="lg:col-span-1 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <DemographicsChart />
        </div>
          <div className="lg:col-span-2 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <PaidVsOrganicChart />
        </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-6">
          <div className="md:col-span-2 xl:col-span-2 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <ReachVsViewsChart />
        </div>
        <div className="md:col-span-1 xl:col-span-1 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <ClicksChart />
        </div>
        <div className="md:col-span-1 xl:col-span-1 border !border-[var(--border)] rounded-xl p-2 bg-[var(--card)]">
          <CpeCpmChart />
        </div>
        </div>

      </div>

    </div>
  );
};

export default Reach;
