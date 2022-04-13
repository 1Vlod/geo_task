import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, TableHead, TextField } from '@mui/material';
import { useStore } from 'effector-react';
import TablePaginationActions from './TablePaginationActions';
import TableRowComponent from './TableRow';
import MaterialUIPickers from '../TimePicker';
import {
  $timeFilters,
  fetchGeoDataFx,
  $geoData,
  $maxSpeed,
  fetchMaxSpeedFx,
  $distance,
  fetchDistanceFx,
  clearFilters,
} from './Model';

function CustomPaginationActionsTable() {
  const geoData = useStore($geoData);
  const timeFilters = useStore($timeFilters);
  const maxSpeed = useStore($maxSpeed);
  const distance = useStore($distance);

  const rows = geoData.data.map(TableRowComponent);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [busId, setBusId] = React.useState('');

  useEffect(() => {
    fetchGeoDataFx({
      page,
      size: rowsPerPage,
      dateStart: timeFilters.dateStart,
      dateEnd: timeFilters.dateEnd,
      busId: +busId,
    });
  }, [page, rowsPerPage, busId, timeFilters]);

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
    <>
      <TableContainer style={{ marginTop: '50px' }} component={Paper}>
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
      <Stack
        style={{ marginTop: '30px' }}
        // spacing={4}
        direction="row"
        justifyContent="space-between"
      >
        <TextField
          label="Bus_id"
          variant="outlined"
          onChange={(event) => {
            setBusId(event.target.value);
          }}
          value={busId}
        />
        <MaterialUIPickers />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ minHeight: '60px' }}>
            <Button
              style={{ minWidth: '100%' }}
              variant="outlined"
              onClick={() => {
                setBusId('');
                clearFilters();
              }}
            >
              Clear filters
            </Button>
          </div>
          <div style={{ minHeight: '60px' }}>
            <Button
              style={{ minWidth: '100%' }}
              variant="outlined"
              onClick={() => {
                if (+busId && timeFilters.dateStart && timeFilters.dateEnd) {
                  fetchMaxSpeedFx({
                    busId: +busId,
                    dateStart: timeFilters.dateStart,
                    dateEnd: timeFilters.dateEnd,
                  });
                }
              }}
            >
              Max speed
            </Button>
            <div style={{ textAlign: 'center' }}>
              {maxSpeed ? maxSpeed + ' km/h' : ''}
            </div>
          </div>
          <div style={{ minHeight: '60px' }}>
            <Button
              style={{ minWidth: '100%' }}
              variant="outlined"
              onClick={() => {
                //TODO: вынести в отдельный переиспользуемый компонент
                if (+busId && timeFilters.dateStart && timeFilters.dateEnd) {
                  fetchDistanceFx({
                    busId: +busId,
                    dateStart: timeFilters.dateStart,
                    dateEnd: timeFilters.dateEnd,
                  });
                }
              }}
            >
              Distance
            </Button>
            <div style={{ textAlign: 'center' }}>
              {distance ? distance + ' km' : ''}
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

export default CustomPaginationActionsTable;
