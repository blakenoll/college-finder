const fs = require("fs");
const csv = require("csv-parser");
const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb://blakenoll:3CUdzQZ6mcpGpNr@ds135714.mlab.com:35714/schools-general";

const dbname = "schools-general";

let count = 0;

(async function() {
  try {
    fs.createReadStream("./csv/academic.csv")
      .pipe(csv())
      .on("data", async data => {
        try {
          const client = await MongoClient.connect(url, {
            useNewUrlParser: true
          });
          const db = client.db(dbname);
          await db
            .collection("general")
            .findOneAndUpdate(
              { scid: parseInt(data.scid) },
              { $set: { academics: { ...data } } },
              (err, doc) => {
                if (err) {
                  throw err;
                } else {
                  count++;
                  console.log(count);
                  client.close();
                }
              }
            );
        } catch (err) {
          console.log(err);
        }
      })
      .on("end", () => console.log(count + " Items updated"));
  } catch (err) {
    console.log(err);
  }
})();
