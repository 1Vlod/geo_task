import { Injectable } from '@nestjs/common';
import { GeoDataRepository } from './db/pg.repository';
@Injectable()
export class AppService {
  constructor(private geoDataRepository: GeoDataRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getData(page?: number, size?: number) {
    const res = await this.geoDataRepository.get(page, size);
    return res;
  }
}
