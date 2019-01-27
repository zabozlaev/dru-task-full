const AppController = require("./controllers/appController.js");

module.exports = app => {
  app.post("/v1/shorten", AppController.convertUrl);
  // redirect
  app.get("/:shortLink", AppController.redirectUser);
};
