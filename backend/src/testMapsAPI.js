require("dotenv").config();

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPS_API_KEY,
  Promise: Promise
});

(async function() {
  try {
    const { lat, lng } = await googleMapsClient
      .geocode({
        address: `5037 cartwright Ave north hollywood CA`
      })
      .asPromise()
      .then(res => {
        return res.json.results[0].geometry.location;
      });
    console.log(`lat: ${lat} lng: ${lng}`);
  } catch (err) {
    console.log(err);
  }
})();
