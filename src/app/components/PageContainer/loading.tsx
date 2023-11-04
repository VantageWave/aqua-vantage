import * as React from 'react';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
  return <Grid2 container columns={16}><Box sx={{ width: '100%', marginTop: "-1px" }}>
    <LinearProgress />
  </Box>
  </Grid2>
};

export default Loading;
