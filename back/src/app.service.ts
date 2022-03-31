import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getData() {
    const res = await this.conn.query('SELECT * FROM geo_data');
    return res.rows;
  }
}
