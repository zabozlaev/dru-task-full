const UrlModel = require("../models/url.js");
const randToken = require("rand-token");

module.exports = {
  async convertUrl(req, res) {
    const { originLink } = req.body;

    if (!originLink) {
      return res.sendStatus(404);
    }

    const foundUrl = await UrlModel.find({ originLink });

    if (!foundUrl) {
      return res.send(foundUrl);
    }

    const shortLink = randToken.generate(6);

    const urlCreated = new UrlModel({
      originLink,
      shortLink
    });
    urlCreated
      .save()
      .then(() => {
        res.status(201).send({
          shortLink
        });
      })
      .catch(e => console.log(e));
  },
  async redirectUser(req, res) {
    const { shortLink } = req.params;

    const foundUrl = await UrlModel.findOne({ shortLink });

    if (!foundUrl) {
      return res.sendStatus(404);
    }

    res.redirect(foundUrl.originLink);
  }
};
