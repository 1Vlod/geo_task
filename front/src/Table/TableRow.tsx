import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { IGeoDataInstance } from '../interfaces';

const TableRowComponent = (row: IGeoDataInstance) => (
  <TableRow key={row.id}>
    <TableCell style={{ width: '2%' }}>{row.id}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.ident}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.lat}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.lon}</TableCell>
    <TableCell style={{ width: '5%' }}>{row.speed}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.device_timestamp}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.server_timestamp}</TableCell>
    <TableCell style={{ width: '10%' }}>{row.direction}</TableCell>
  </TableRow>
)

export default TableRowComponent;