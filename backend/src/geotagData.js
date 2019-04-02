require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPS_API_KEY,
  Promise: Promise
});

const url = process.env.MONGO_URL;

const dbname = "schools-general";

let count = 0;

async function getAllSchools() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log("connection succesful");
    const db = client.db(dbname);
    let data = await db
      .collection("general")
      .find({}) // put a limit for testing purposes
      .toArray();
    client.close();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function geoCodeData() {
  try {
    const data = await getAllSchools();
    console.log(`succcesfully retrived ${data.length} records`);
    // loop through all records and update
    data.forEach(async item => {
      try {
        // get GeoJSON data from Maps API
        const { lat, lng } = await googleMapsClient
          .geocode({
            address: `${item.address}, ${item.city}, ${item.state}`
          })
          .asPromise()
          .then(res => {
            return res.json.results[0].geometry.location;
          });
        // connect to DB and update record
        const client = await MongoClient.connect(url, {
          useNewUrlParser: true
        });
        const db = client.db(dbname);

        await db.collection("general").findOneAndUpdate(
          { scid: parseInt(item.scid) },
          {
            $set: {
              geo: {
                type: "Point",
                coordinates: [lng, lat]
              }
            }
          },
          (err, doc) => {
            if (err) {
              throw err;
            } else {
              count++;
              console.log(
                `${
                  doc.value.ARCO_name
                } updated succesfully ${count} records updated succesfully`
              );
              client.close();
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

geoCodeData();
