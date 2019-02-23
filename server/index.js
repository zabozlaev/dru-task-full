const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const { URI, PORT } = require("./config/config.js");

const AppRoutes = require("./routes.js");

module.exports.start = async () => {
  app.use(cors());

  app.use(require("morgan")("combined"));

  app.use(bodyParser.json());

  AppRoutes(app);

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
};
