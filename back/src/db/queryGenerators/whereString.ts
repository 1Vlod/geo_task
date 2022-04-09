import { IDBGetQuery } from '../interfaces';

export const createWhereString = (params: Omit<IDBGetQuery, 'page' | 'size'>) => {
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