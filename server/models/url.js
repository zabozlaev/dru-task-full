const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "url",
  Schema({
    shortLink: {
      type: String,
      required: true,
      unique: true
    },
    originLink: {
      type: String,
      required: true,
      unique: true
    }
  })
);
