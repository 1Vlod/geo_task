import React from 'react';
import { createEffect, createStore } from 'effector';
import { useList, useStore } from 'effector-react';

const fetchUserFx = createEffect(async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();
  console.log('result', result);
  return result.data;
});

const $geoData = createStore<any[]>([]).on(
  fetchUserFx.doneData,
  (state, result) => result
);

const url = 'http://localhost:5000/geoData?busId=359647090157996';

const GeoDataList = () => {
  const geoData = useStore($geoData);
  const list = useList<any[]>($geoData, (elem: any, i) => (
    <li>
      {elem.id}, {elem.ident}
    </li>
  ));

  return (
    <>
      {geoData.length ? (
        <div>
          GeoData:
          <ul>
            <li>id, ident</li>
            {list}
          </ul>
        </div>
      ) : (
        <div>no data available</div>
      )}
    </>
  );
};

const Example = () => {
  const pending = useStore(fetchUserFx.pending);

  return (
    <div>
      <GeoDataList />
      <button disabled={pending} onClick={() => fetchUserFx(url)}>
        load data
      </button>
    </div>
  );
};

export default Example;
