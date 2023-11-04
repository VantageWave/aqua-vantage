'use client';
import React, { useState, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Tooltip,
  IconButton,
  Checkbox,
  TableContainer,
  TablePagination,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { Catalog, Order } from '@/app/utils/types';
import { getComparator, stableSort } from '@/app/utils/tableUtils';
import { getCatalogsUrl } from '@/utils/clientUrls';
import useSWR from 'swr';
import Link from 'next/link';
import LoadingTable from './LoadingTable';

const CatalogsTable = () => {
  const {
    data: rows,
    error,
    isLoading,
  } = useSWR<Catalog[], Error>(getCatalogsUrl(), async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Catalog>('numberOfAOI');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Catalog) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && rows !== undefined) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rows ? (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0) : 0;

  const visibleRows = useMemo(() => {
    if (rows) {
      return stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return [];
  }, [order, orderBy, page, rowsPerPage, rows]);

  const handleDeleteClick = (e: Event, id: string) => {
    // TODO
  };

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: 'auto', m: 4 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows ? rows.length : 0}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.numberOfAOI}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Show">
                        <Link href={`/catalogs/catalog/${row.id}`}>
                          <IconButton
                            disabled={selected.length > 0}
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Link href="/map">
                          <IconButton
                            disabled={selected.length > 0}
                            onClick={(e: any) => {
                              e.stopPropagation();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          disabled={selected.length > 0}
                          onClick={(e: any) => {
                            e.stopPropagation();
                            handleDeleteClick(e, row.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default CatalogsTable;
