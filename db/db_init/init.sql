CREATE TABLE geo_data (
  ident bigint NOT NULL,
  lat double precision,
  lon double precision,
  speed int,
  device_timestamp timestamp NOT NULL,
  server_timestamp timestamp NOT NULL,
  direction int,
  id serial PRIMARY KEY
);

\copy geo_data(ident, lat, lon, speed, device_timestamp, server_timestamp, direction) FROM '/init_files/data.csv' DELIMITER ',' CSV HEADER;