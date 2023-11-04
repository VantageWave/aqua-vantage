import * as React from 'react';
import { Button, Grid } from '@mui/material';

export const AreasTableActions = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <Grid container spacing={1} direction="row">
      <Grid item>
        <Button variant="contained" disabled>Analyze now</Button>
      </Grid>
    </Grid>
  );
};
