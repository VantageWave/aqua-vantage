'use client';
import React from 'react';
import { Box, ButtonGroup, Card, CardContent, Chip, Drawer, FormControlLabel, FormGroup, Grid, IconButton, Paper, Switch, Typography } from '@mui/material';
import { Add, AddOutlined, Edit, EventNote, Folder, Info, LockClockSharp, Timer, Visibility } from '@mui/icons-material';
import { Stack } from '@mui/system';

const Water = () => {
  const [waterMaskEnabled, setWaterMaskEnabled] = React.useState(false);
  const [rhsPanelOpen, setRhsPanelOpen] = React.useState(true);

  // Function to handle the panel toggle
  const handlePanelToggle = () => {
    setWaterMaskEnabled(!waterMaskEnabled);
  };

  const buttonStyle = {
    border: '1px solid #e0e0e0', // light grey border
    borderRadius: 0,
    height: '72px', // typical subheader height
    width: '72px', // making it square, change as needed
    '&:hover': {
      backgroundColor: "lightblue", // slightly darker on hover
    },
  };

  const overlayStyle = {
    position: 'absolute', // Position over the map
    left: 35, // Spacing from the top
    top: 190, // Spacing from the right
    zIndex: 1000, // Make sure it's above the map
    backgroundColor: 'rgba(0, 120, 215, 0.5)',
    borderRadius: '8px',
    padding: '10px',
  };

  return (
    <Grid container direction="column" sx={{
    }}>
        <Grid item container direction="row" justifyContent="space-between" sx={{
            backgroundColor: 'black',
        }}>
            <Grid item direction="row" sx={{ width: "1000px", display: "flex",  padding: '16px', justifyContent: "space-between" }} justifyContent="space-between">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ cursor: 'grab', textDecoration: 'none', color: '#1976d2', '&:hover': { textDecoration: 'underline' } }}>
                        Kraków
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        /&nbsp;Węgrzce Wielkie
                    </Box>
                </Box>

                <Box sx={{ display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1976d2',
                    borderRadius: '16px',
                    padding: '8px 16px',
                    color: '#fff',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    }}}>
                    <Add />
                    New report
                </Box>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ backgroundColor: "#1976d2" }}>
                <IconButton aria-label="view" sx={buttonStyle}>
                    <Timer />
                </IconButton>
                <IconButton aria-label="news" sx={buttonStyle}>
                    <Folder />
                </IconButton>
                <IconButton aria-label="info" sx={buttonStyle} onClick={() => setRhsPanelOpen(true)}>
                    <Info />
                </IconButton>
            </ButtonGroup>
        </Grid>  
        <Grid item sx={{ height: "100%" }}>
            <Box sx={overlayStyle}>
                <FormGroup>
                <FormControlLabel
                    control={<Switch checked={waterMaskEnabled} onChange={() => handlePanelToggle()} />}
                    label={"Water mask"}
                />
                </FormGroup>
            </Box>
            <Grid item sx={{ height: "100%" }}>
                <img
                    src={waterMaskEnabled ? "/wegrzce_layer.png" : "/wegrzce.png"}
                    style={{ width: '100%', height: "815px", objectFit: 'cover' }}
                />
            </Grid>
        </Grid>
        {/* below right hand side panel that covers the map: it has name, description and tags */}
        <Drawer
            anchor="right"
            open={rhsPanelOpen}
            onClose={() => setRhsPanelOpen(false)}
            sx={{
                '& .MuiDrawer-paper': { width: 370, boxSizing: 'border-box' },
            }}
            PaperProps={{
                sx: {
                  height: 'calc(100% - 157px)',
                  top: 157,
                },
            }}
        >
            <Card sx={{ maxWidth: 370 }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: "8px" }}>
                        <Typography variant="h5" component="div">
                            Details
                        </Typography>
                        <IconButton aria-label="edit">
                            <Edit />
                        </IconButton>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: "4px" }}>
                        <Typography variant="body1" sx={{ marginRight: "6px" }}>
                            Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Węgrzce Wielkie
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ marginTop: "12px" }}>
                        Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: "4px" }}>
                        Zbiorniki powyrobiskowe po kopalnii Kruszywo
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: "12px" }}>
                        Tags
                    </Typography>
                    <Stack direction="row" spacing={1} mt={2}>
                        <Chip label="Kraków" color="info" />
                        <Chip label="kopalnie" />
                    </Stack>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370 }}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        Coordinates
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" component="p">
                        <strong>Location</strong> 50.03155N, 20.124405E
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" component="p">
                        <strong>Area</strong> 0,08 km²
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" component="p">
                        <strong>Volume est.</strong> 0,39 km³
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 370 }}>
                <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                        Metrics
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="body2" component="p">
                        <strong>Water Quality Index:</strong>
                        <Chip
                            label={79}
                            style={{ backgroundColor: "lightgreen", color: "black", height: "16px", marginLeft: "8px" }}
                        />
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ minWidth: 350, margin: "10px 10px 10px 10px" }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" component="div">
                        Metrics attached
                    </Typography>
                    <IconButton color="primary" aria-label="add metric">
                        <AddOutlined />
                    </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1} mt={2}>
                        <Chip
                            label="Water Quality Index"
                            color="primary"
                            onDelete={() => {
                                // Handle the delete event here
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ minWidth: 350, backgroundColor: "#0078D4", margin: "10px 10px 10px 10px" }}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" component="div">
                        Models enabled
                    </Typography>
                    <IconButton color="primary" aria-label="add model">
                        <AddOutlined />
                    </IconButton>
                    </Stack>
                    <Stack direction="row" spacing={1} mt={2}>
                        <Chip
                            label="NDWI"
                            color="primary"
                            onDelete={() => {
                                // Handle the delete event here
                            }}
                        />
                        <Chip
                            label="Water Type"
                            color="primary"
                            onDelete={() => {
                                // Handle the delete event here
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
            {/* Panel content here */}
            {/* Three sections: Details, Coordinates, Metrics Attached */}
            {/* Details section with Name, Description and Tag content; Coordinates section with location coordinates, area and volume estimation; Metrics attached with read-only colorful tags: Water Quality Index, Water type, Chloro; Models enabled section with NDWI and Water Type read-only tags */}
        </Drawer>
    </Grid>
  );
};

export default Water;