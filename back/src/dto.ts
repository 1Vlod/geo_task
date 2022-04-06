export class GetGeoDataQuery {
  page?: string;
  size?: string;
  dateStart?: string;
  dateEnd?: string;
  busId?: string;
}

export class GetMaxSpeedQuery {
  dateStart: string;
  dateEnd: string;
}
