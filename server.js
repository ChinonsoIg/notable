const express     = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser  = require("body-parser");
const db         = require("./config/db");

const app         = express();

const port        = 8000;

// Before bodyPerser was included, "console.log(req.body)" returns undefined because express can't process url encoded stuffs
app.use(bodyParser.urlencoded({ extended: true }));


const client = new MongoClient(db.url, { useNewUrlParser: true });

client.connect(err => {
  if (err) console.log("Error: ", err)
  const dbase = client.db("notable")
  require("./app/routes")(app, dbase);
  app.listen(port, () => {
    console.log(`We are live on ${port}`);
  });
})

// MongoClient.connect(db.url, (err, dbase) => { 
//   // let dbase = client.db('notable');
//   if (err) return console.log(err)
//   require("./app/routes")(app, dbase);

//   app.listen(port, () => {
//     console.log(`We are live on ${port}`);
//   })

// })

