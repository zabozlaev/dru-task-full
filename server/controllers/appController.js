const UrlModel = require("../models/url.js");
const randToken = require("rand-token");

module.exports = {
  async convertUrl(req, res) {
    try {
      const { originLink } = req.body;

      if (!originLink) {
        return res.sendStatus(404);
      }

      if (originLink.trim().length < 1) {
        return res.send(403).send({
          error: "No empty links available!"
        });
      }

      const foundUrl = await UrlModel.findOneAndUpdate(
        { originLink },
        { shortLink: randToken.generate(6) }
      );

      if (foundUrl) {
        return res.send({
          originLink: foundUrl.originLink,
          shortLink: foundUrl.shortLink
        });
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
    } catch (e) {
      console.log(e);
    }
  },
  async redirectUser(req, res) {
    const { shortLink } = req.params;

    const foundUrl = await UrlModel.findOne({
      shortLink: shortLink.toString()
    });

    if (!foundUrl) {
      return res.status(404).send({
        error: "Incorrect URL"
      });
    }

    endpoint = foundUrl.originLink.includes("://")
      ? foundUrl.originLink
      : "http://" + foundUrl.originLink;

    res.redirect(endpoint);
  }
};
