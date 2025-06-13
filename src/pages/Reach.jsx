import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Reach = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reach Analytics</Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography>Reach, impressions, engagement, and growth metrics of influencer campaigns will be visualized here.</Typography>
      </Paper>
    </Box>
  );
};

export default Reach;
