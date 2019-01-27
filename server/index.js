const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config({ path: "variables.env" });

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const { URI, PORT } = require("./config/config.js");

const setRoutes = require("./routes.js");

app.use(bodyParser.json());
app.use(cors());

setRoutes(app);

// app.post("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.get("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

mongoose
  .connect(
    URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log(`[DATABASE] - CONNECTED`);
    app.listen(process.env.PORT || 8000, () => {
      console.log(`[SERVER] - LISTENING ON ${PORT}`);
    });
  })
  .catch(e => console.log(e));
