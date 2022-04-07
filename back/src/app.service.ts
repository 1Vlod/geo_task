import { Injectable } from '@nestjs/common';
import { GeoDataRepository } from './db/pg.repository';
@Injectable()
export class AppService {
  constructor(private geoDataRepository: GeoDataRepository) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getData({
    id,
    page,
    size,
    ...other
  }: {
    id?: number;
    page?: number;
    size?: number;
    busId?: number;
    dateStart?: string;
    dateEnd?: string;
  }) {
    if (id) {
      return await this.geoDataRepository.getOne(id);
    }
    const res = await this.geoDataRepository.get({
      page,
      size,
      ...other,
    });
    return res;
  }

  async getMaxSpeed(params: {
    busId: number;
    dateStart: string;
    dateEnd: string;
  }) {
    return this.geoDataRepository.getMaxSpeed(params);
  }
}
