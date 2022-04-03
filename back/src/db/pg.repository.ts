import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_CONNECTION } from 'src/constants';

export interface IGeoDataRepository {
  get(size: number, page: number): Promise<any>;
}

@Injectable()
export class GeoDataRepository implements IGeoDataRepository {
  constructor(@Inject(DB_CONNECTION) private db: Pool) {}
  async get(page = 1, size = 10) {
    const data = await this.db.query(
      'SELECT * FROM geo_data OFFSET $1 LIMIT $2',
      [(page - 1) * size, size],
    );
    return { data: data.rows, count: data.rowCount };
  }
}
