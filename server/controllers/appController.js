const LinkModel = require("../models/Link.js");
const randToken = require("rand-token");

module.exports = {
  async convertUrl(req, res) {
    try {
      const { url, visitLimit } = req.body;

      visitLimit = visitLimit < 1 ? 1 : visitLimit;

      if (!url) {
        return res.sendStatus(404);
      }

      if (url.length < 1) {
        return res.send(403).send({
          error: "No empty links available!"
        });
      }

      const foundUrl = (await LinkModel.find({ url }))[0];

      if (foundUrl) {
        return res.send({
          url: foundUrl.url,
          shortLink: foundUrl.shortLink
        });
      }

      const tokenShort = randToken.generate(6);

      const urlCreated = new LinkModel({
        url,
        shortLink: tokenShort,
        visitLimit
      });
      urlCreated
        .save()
        .then(() => {
          res.status(201).send({
            shortLink: tokenShort
          });
        })
        .catch(e => {});
    } catch (e) {}
  },
  async redirectUser(req, res) {
    const { shortLink } = req.params;

    try {
      const foundUrl = await LinkModel.findOne({
        shortLink: shortLink
      });

      if (!foundUrl) {
        return res.status(404).send({
          error: "Incorrect URL"
        });
      }

      if (foundUrl.visitNumber >= foundUrl.visitLimit) {
        await LinkModel.deleteOne({ shortLink })
          .then(() => {
            return res.send({
              error: "This link has expired"
            });
          })
          .catch(e => {});
      }

      await LinkModel.findOneAndUpdate(
        { _id: foundUrl._id },
        { $inc: { visitNumber: 1 } }
      );

      endpoint = foundUrl.url.includes("://")
        ? foundUrl.url
        : "http://" + foundUrl.url;

      res.redirect(endpoint);
    } catch (e) {
      res.send("");
    }
  }
};
