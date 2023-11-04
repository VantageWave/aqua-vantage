// Material UI edit form that allows to edit name and description of an area
// Path: src/app/components/AreaEdit.tsx
import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Area from '../../../data/Area';

interface AreaEdit {
  area: Area;
  handleClose: () => void;
  handleSave: () => void;
}

export const AreaEdit = ({ area, handleClose, handleSave }: AreaEdit) => {
  const [name, setName] = useState(area.name);
  const [description, setDescription] = useState(area.description);

  useEffect(() => {
    setName(area.name);
    setDescription(area.description);
  }, [area.name, area.description]);

  const handleSaveClick = () => {
    area.setName(name);
    area.setDescription(description);
    handleSave();
    handleClose();
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '80%' },
      }}
      noValidate
      autoComplete="off"
      border="1px solid rgba(229, 231, 235,0.25)"
      borderBottom="1px solid rgba(229, 231, 235,0.5)"
    >
      <Paper>
        <Typography variant="h5" component="p" marginLeft={2} paddingY={2}>
          Edit
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={name}
            size="small"
            onChange={(e) => setName(e.target.value)}
            onClick={(e: any) => {
              e.target?.select();
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            maxRows={5}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="tags"
            label="Tags"
            type="text"
            multiline
            rows={1}
            maxRows={2}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end" paddingY={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveClick} autoFocus>
            Save
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};
