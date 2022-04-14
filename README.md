# geo_task

### How to run

1. Replace `data.csv(~22kb)` by full `data.csv(40+ mb)` file in `db/init_files`
2. `docker-compose build`
3. `docker-compose up`
4. Open [localhost:3000](http://localhost:3000)

### API docs
`localhost:5000/geoData/:id?` - Get only one data instance by its id.

`localhost:5000/geoData?busId,page,size,dateStart,dateEnd` - Get all geo data. \
`busId` - filter by ident field in db. \
`dateStart`, `dateEnd` - filter by server_timestamp field in db.

`localhost:5000/geoData/distance/bus_id?dateStart,dateEnd` - Get bus distance by its id between two dates. Bus_id and query params are required.

`localhost:5000/geoData/distance/bus_id?dateStart,dateEnd` - Get bus maxSpeed by its id between two dates. Bus_id and query params are required.
