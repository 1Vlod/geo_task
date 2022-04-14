import React from 'react';
import Map from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  '';


function MapComponent() {
  return (
    <Map
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    />
  );
}

export default MapComponent;
