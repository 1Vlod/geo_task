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
  busId?: string;
  dateStart?: string;
  dateEnd?: string;
}

export interface IDBGetMaxSpeedQuery {
  busId: string;
  dateStart: string;
  dateEnd: string;
}
