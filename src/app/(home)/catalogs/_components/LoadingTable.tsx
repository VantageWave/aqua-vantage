import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  TableContainer,
  TablePagination,
  Skeleton,
} from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const LoadingTable = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: 'auto', m: 4 }}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={0}
              order={'asc'}
              orderBy={'numberOfAOI'}
              onSelectAllClick={() => {}}
              onRequestSort={() => {}}
              rowCount={10}
            />
            <TableBody>
              {Array.from(new Array(10)).map((_, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index} sx={{ cursor: 'pointer' }}>
                  <TableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </TableCell>
                  <TableCell component="th" id={`enhanced-table-checkbox-${index}`} scope="row" padding="none">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={10}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>
    </Box>
  );
};

export default LoadingTable;
