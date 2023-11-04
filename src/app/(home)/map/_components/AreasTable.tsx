import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, IconButton, Paper } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Area from '@/data/Area';

export const AreasTable = ({
  areas,
  onEdit,
  onDelete,
}: {
  areas: Area[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 80 },
    { field: 'description', headerName: 'Description', width: 110 },
    { field: 'coordinates', headerName: 'Coordinates', width: 215 },
    { field: 'tags', headerName: 'Tags', width: 80},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params: GridValueGetterParams) => (
        <strong>
          <IconButton size="small" aria-label="edit" onClick={() => onEdit(params.id)}>
            <Edit />
          </IconButton>
          <IconButton size="small" aria-label="delete" onClick={() => onDelete(params.id)}>
            <Delete />
          </IconButton>
        </strong>
      ),
    },
  ];
  const rows = areas.map((area) => ({
    id: area.id,
    name: area.name,
    description: area.description,
    tags: area.tags,
    coordinates: [
      area.northeast.lat.toFixed(3),
      area.northeast.lng.toFixed(3) + " N",
      area.southwest.lat.toFixed(3),
      area.southwest.lng.toFixed(3) + " E",
    ].join(', '),
  }));
  return (
    <Box component="main">
      <Paper style={{ height: '410px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={5}
          sx={{
            '.MuiDataGrid-row': {
              fontSize: '0.75rem',
            },
            '.MuiDataGrid-colCell': {
              fontSize: '0.15rem',
            },
          }}
        />
      </Paper>
    </Box>
  );
};
