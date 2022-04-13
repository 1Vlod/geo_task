export interface ITablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export interface IGeoDataParams {
  page?: number;
  size?: number;
  busId?: number;
  dateStart?: Date | null;
  dateEnd?: Date | null;
}

export interface IGeoDataInstance {
  ident: number;
  lat?: number;
  lon?: number;
  speed?: number;
  device_timestamp: string;
  server_timestamp: string;
  direction?: number;
  id: number;
}