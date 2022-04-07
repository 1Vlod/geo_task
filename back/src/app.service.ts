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

  async getMaxSpeed(params: IMainParams) {
    return this.geoDataRepository.getMaxSpeed(params);
  }

  async getBusDistance(params: IMainParams) {
    const { coordinates } = await this.geoDataRepository.getCoordinates(params);
    let distance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) { //TODO: refactor to array methods
      distance += getDistance(
        coordinates[i].lat,
        coordinates[i].lon,
        coordinates[i + 1].lat,
        coordinates[i + 1].lat,
      );
    }
    return { distance };
  }
}

interface IMainParams {
  busId: number;
  dateStart: string;
  dateEnd: string;
}

// TODO: move these functions
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Converts numeric degrees to radians
function toRad(value) {
  return (value * Math.PI) / 180;
}
