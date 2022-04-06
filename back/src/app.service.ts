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
    id?: string;
    page?: string;
    size?: string;
    busId?: string;
    dateStart?: string;
    dateEnd?: string;
  }) {
    if (id) {
      return await this.geoDataRepository.getOne(id);
    }
    const res = await this.geoDataRepository.get({
      page: page && +page,
      size: size && +size,
      ...other,
    });
    return res;
  }
}
