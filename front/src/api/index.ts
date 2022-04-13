import { API_URL } from '../constants';
import { IGeoDataParams } from '../interfaces';

export const fetchGeoData = async ({
  busId,
  dateStart,
  dateEnd,
  page,
  size,
}: IGeoDataParams) => {
  const urlObject = new URL(API_URL);
  if (busId) {
    urlObject.searchParams.set('busId', String(busId));
  }
  if (dateStart) {
    urlObject.searchParams.set('dateStart', dateStart.toString());
  }
  if (dateEnd) {
    urlObject.searchParams.set('dateEnd', dateEnd.toString());
  }
  if (page) {
    urlObject.searchParams.set('page', String(page + 1));
  }
  if (size) {
    urlObject.searchParams.set('size', String(size));
  }

  const response = await fetch(urlObject.toString());
  const result = await response.json();
  console.log('result', result);
  return result;
};

export const fetchMaxSpeed = async ({
  busId,
  dateStart,
  dateEnd,
}: Omit<IGeoDataParams, 'page' | 'size'>) => {
  const urlObject = new URL(API_URL + '/speed/' + busId);
  if (dateStart) {
    urlObject.searchParams.set('dateStart', dateStart.toString());
  }
  if (dateEnd) {
    urlObject.searchParams.set('dateEnd', dateEnd.toString());
  }

  const response = await fetch(urlObject.toString());
  const result: { maxSpeed: number } = await response.json();
  console.log('result', result);
  return result.maxSpeed;
};



export const fetchDistance = async ({
  busId,
  dateStart,
  dateEnd,
}: Omit<IGeoDataParams, 'page' | 'size'>) => {
  const urlObject = new URL(API_URL + '/distance/' + busId);
  if (dateStart) {
    urlObject.searchParams.set('dateStart', dateStart.toString());
  }
  if (dateEnd) {
    urlObject.searchParams.set('dateEnd', dateEnd.toString());
  }

  const response = await fetch(urlObject.toString());
  const result: { distance: number } = await response.json();
  console.log('result', result);
  return result.distance;
};
