import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_CONNECTION } from 'src/constants';
import {
  IBusIdFilter,
  IDateFilters,
  IDBGetQuery,
  IGeoDataInstance,
  IGetGeoDataResponse,
} from './interfaces';
import { createWhereString } from './queryGenerators/whereString';

export interface IGeoDataRepository {
  getOne(id: number): Promise<{ data: IGeoDataInstance }>;
  get(query: IDBGetQuery): Promise<IGetGeoDataResponse>;
  getMaxSpeed(
    params: IBusIdFilter & IDateFilters,
  ): Promise<{ maxSpeed: number }>;
  getCoordinates(
    params: IBusIdFilter & IDateFilters,
  ): Promise<{ coordinates: { lon: number; lat: number }[] }>;
}

@Injectable()
export class GeoDataRepository implements IGeoDataRepository {
  constructor(@Inject(DB_CONNECTION) private db: Pool) {}
  async getOne(id: number) {
    try {
      const data = await this.db.query<IGeoDataInstance>(
        'SELECT * FROM geo_data WHERE id = $1',
        [id],
      );
      return {
        data: data.rows[0],
      };
    } catch (error) {
      throw error;
    }
  }
  async get({ page = 1, size = 10, ...other }: IDBGetQuery) {
    try {
      const whereString = createWhereString(other);
      const getDataQuery = `SELECT * FROM geo_data ${whereString}  OFFSET $1 LIMIT $2`;
      const getCountQuery = `SELECT COUNT(*) FROM geo_data ${whereString}`;
      const values = [(page - 1) * size, size];

      const geoData = await this.db.query<IGeoDataInstance>(
        getDataQuery,
        values,
      );
      const totalCount = await this.db.query<{ count: string }>(getCountQuery);
      const count = +totalCount.rows[0].count;

      return {
        data: geoData.rows,
        count: geoData.rowCount,
        page,
        totalPages: Math.ceil(count / size),
        totalCount: count,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMaxSpeed(params: IBusIdFilter & IDateFilters) {
    try {
      const whereString = createWhereString(params);
      const getMaxSpeedQuery = `SELECT MAX(speed) FROM geo_data ${whereString}`;

      const maxSpeed = await this.db.query<{ max: number }>(getMaxSpeedQuery);

      return {
        maxSpeed: maxSpeed.rows[0].max,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCoordinates(params: IBusIdFilter & IDateFilters) {
    try {
      const whereString = createWhereString(params);
      const getCoordinatesQuery = `SELECT lat, lon FROM geo_data ${whereString} AND lat IS NOT null AND lon IS NOT null`;

      const coordinates = await this.db.query<{ lat: number; lon: number }>(
        getCoordinatesQuery,
      );

      return {
        coordinates: coordinates.rows,
      };
    } catch (error) {
      throw error;
    }
  }
}
