const AppController = require("./controllers/appController.js");

module.exports = app => {
  app.post("/shorten", AppController.convertUrl);
  // redirect
  app.get("/:shortLink", AppController.redirectUser);
};
