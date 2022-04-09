export const countDistance = (coordinates: { lat: number; lon: number }[]) => {
  return coordinates.reduce((acc, elem, i) => {
    if (i === coordinates.length - 1) {
      return acc;
    }
    return (
      acc +
      getDistanceBetween2coords(
        elem.lat,
        elem.lon,
        coordinates[i + 1].lat,
        coordinates[i + 1].lon,
      )
    );
  }, 0);
};

const getDistanceBetween2coords = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
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
};

const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};
