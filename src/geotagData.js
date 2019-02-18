const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb://blakenoll:3CUdzQZ6mcpGpNr@ds135714.mlab.com:35714/schools-general";

const dbname = "schools-general";

(async function() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log("connection succesful");
    const db = client.db(dbname);
    let data = await db
      .collection("general-info")
      .find({})
      .toArray();
    console.log(data);
    client.close();
  } catch (err) {
    console.log(err);
  }
})();
