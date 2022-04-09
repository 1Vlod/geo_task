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

export interface IDBGetQuery {
  page?: number;
  size?: number;
  busId?: number;
  dateStart?: string;
  dateEnd?: string;
}

export interface IBusIdFilter {
  busId: number;
}

export interface IDateFilters {
  dateStart: string;
  dateEnd: string;
}

export interface IGetGeoDataResponse {
  data: IGeoDataInstance[];
  count: number;
  page: number;
  totalPages: number;
  totalCount: number;
}
