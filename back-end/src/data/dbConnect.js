require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

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
    MongoClient.connect(url, { useNewUrlParser: true }).then(client => {
      const db = client.db(dbname);
      db.collection("general")
        .aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [args.lng, args.lat]
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

export { getSchools, getInfo, getWithinDistance };
