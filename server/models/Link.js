const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  "Link",
  Schema({
    shortLink: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    visitLimit: {
      type: Number,
      default: 1
    },
    visitNumber: {
      type: Number,
      default: 0
    }
  })
);
