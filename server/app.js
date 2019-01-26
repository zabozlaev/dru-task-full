const express = require("express");
const app = express();

const morgan = require("morgan");

const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");

const { URI, PORT } = require("./config/config.js");

const setRoutes = require("./routes.js");

app.use(bodyParser.json());
app.use(cors());

app.use(morgan("combined"));

setRoutes(app);

mongoose
  .connect(
    URI,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log(`[DATABASE] - CONNECTED`);
    app.listen(PORT, () => {
      console.log(`[SERVER] - LISTENING ON ${PORT}`);
    });
  })
  .catch(e => console.log(e));
