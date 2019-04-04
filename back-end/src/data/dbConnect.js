require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPS_API_KEY,
  Promise: Promise
});

const url = process.env.MONGO_URL;
const dbname = "schools-general";

const getSchools = args =>
  new Promise((resolve, reject) => {
    const query = { $text: { $search: args.query } };
    MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
      const db = client.db(dbname);
      db.collection("general")
        .find(query)
        .toArray((err, results) => {
          err ? reject(err) : resolve(results);
          client.close();
        });
    });
  });

const getInfo = scid =>
  new Promise((resolve, reject) => {
    const query = { scid: scid };
    MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
      const db = client.db(dbname);
      db.collection("general")
        .findOne(query)
        .then(result => {
          result != null ? resolve(result) : reject("object is null");
          client.close();
        });
    });
  });

const getWithinDistance = args =>
  new Promise((resolve, reject) => {
    googleMapsClient
      .geocode({ address: `${args.zip}` })
      .asPromise()
      .then(res => {
        const { lng, lat } = res.json.results[0].geometry.location;
        return { lng, lat };
      })
      .then(data => {
        MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
          const db = client.db(dbname);
          db.collection("general")
            .aggregate([
              {
                $geoNear: {
                  near: {
                    type: "Point",
                    coordinates: [data.lng, data.lat]
                  },
                  distanceField: "dist.calculated",
                  maxDistance: args.miles * 1609.344,
                  includeLocs: "dist.location",
                  spherical: true
                }
              }
            ])
            .toArray((err, results) => {
              err ? reject(err) : resolve(results);
              client.close();
            });
        });
      });
  });

export { getSchools, getInfo, getWithinDistance };
