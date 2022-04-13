import { createApi, createEffect, createStore } from 'effector';
import { fetchDistance, fetchGeoData, fetchMaxSpeed } from '../../api';

export const $timeFilters = createStore<{
  dateStart: Date | null;
  dateEnd: Date | null;
}>({ dateStart: null, dateEnd: null });

export const { changeDateStart, changeDateEnd, clearFilters } = createApi(
  $timeFilters,
  {
    changeDateStart: (state, dateStart) => ({ ...state, dateStart }),
    changeDateEnd: (state, dateEnd) => ({ ...state, dateEnd }),
    clearFilters: () => ({ dateStart: null, dateEnd: null }),
  }
);

export const fetchGeoDataFx = createEffect(fetchGeoData);

export const $geoData = createStore<any>({ data: [] }).on(
  fetchGeoDataFx.doneData,
  (state, result) => result
);

export const fetchMaxSpeedFx = createEffect(fetchMaxSpeed);

export const $maxSpeed = createStore<null | number>(null).on(
  fetchMaxSpeedFx.doneData,
  (state, result) => result
);

export const fetchDistanceFx = createEffect(fetchDistance);

export const $distance = createStore<null | number>(null).on(
  fetchDistanceFx.doneData,
  (state, result) => result
);
