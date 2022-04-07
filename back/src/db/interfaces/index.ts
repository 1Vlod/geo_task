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

export interface IDBGetMaxSpeedQuery {
  busId: number;
  dateStart: string;
  dateEnd: string;
}
