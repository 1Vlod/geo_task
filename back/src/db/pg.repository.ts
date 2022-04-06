import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_CONNECTION } from 'src/constants';
import {
  IDBGetMaxSpeedQuery,
  IDBGetQuery,
  IGeoDataInstance,
} from './interfaces';

export interface IGeoDataRepository {
  get(query: IDBGetQuery): Promise<any>;
}

@Injectable()
export class GeoDataRepository implements IGeoDataRepository {
  constructor(@Inject(DB_CONNECTION) private db: Pool) {}
  async getOne(id: string) {
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
      const dbString = `SELECT * FROM geo_data ${whereString}  OFFSET $1 LIMIT $2`; //TODO: change names of variables to query
      const dbCountString = `SELECT COUNT(*) FROM geo_data ${whereString}`;
      const values = [(page - 1) * size, size];

      const geoData = await this.db.query<IGeoDataInstance>(dbString, values);
      const totalCount = await this.db.query<{ count: string }>(dbCountString);
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

  async getMaxSpeed(params: IDBGetMaxSpeedQuery) {
    try {
      const whereString = createWhereString(params);
      const queryString = `SELECT MAX(speed) FROM geo_data ${whereString}`;

      const maxSpeed = await this.db.query<IGeoDataInstance>(queryString);

      return {
        maxSpeed: maxSpeed.rows[0],
      };
    } catch (error) {
      throw error;
    }
  }
}

const createWhereString = (params: Omit<IDBGetQuery, 'page' | 'size'>) => {
  const where = [];
  if (params.busId) {
    where.push(`ident = ${params.busId}`);
  }

  if (params.dateStart) {
    if (where.length) {
      where.push('AND');
    }
    where.push(`server_timestamp >= '${getDateStringForPg(params.dateStart)}'`);
  }

  if (params.dateEnd) {
    if (where.length) {
      where.push('AND');
    }
    where.push(`server_timestamp <= '${getDateStringForPg(params.dateEnd)}'`);
  }
  return where.length ? 'WHERE ' + where.join(' ') : '';
};

const getDateStringForPg = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getUTCFullYear()}-${
    dateObj.getUTCMonth() + 1
  }-${dateObj.getUTCDate()} ${dateObj.getUTCHours()}:${dateObj.getUTCMinutes()}:${dateObj.getUTCSeconds()}`;
};
