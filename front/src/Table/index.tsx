import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableHead } from '@mui/material';
import { createEffect, createStore } from 'effector';
import { useStore } from 'effector-react';
import { fetchGeoData } from '../api';
import TablePaginationActions from './TablePaginationActions';
import TableRowComponent from './TableRow';

const fetchGeoDataFx = createEffect(fetchGeoData);

const $geoData = createStore<any>({ data: [] }).on(
  fetchGeoDataFx.doneData,
  (state, result) => result
);

function CustomPaginationActionsTable() {
  const geoData = useStore($geoData);
  const rows = geoData.data.map(TableRowComponent);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    fetchGeoDataFx({ page, size: rowsPerPage });
  }, [page, rowsPerPage]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - geoData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Bus_id</TableCell>
            <TableCell>Lat</TableCell>
            <TableCell>Lon&nbsp;</TableCell>
            <TableCell>Speed&nbsp;</TableCell>
            <TableCell>device_timestamp&nbsp;</TableCell>
            <TableCell>server_timestamp&nbsp;</TableCell>
            <TableCell>direction&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={geoData.totalCount || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CustomPaginationActionsTable;
