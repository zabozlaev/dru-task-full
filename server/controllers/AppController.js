const LinkModel = require("../models/Link.js");

const shortenLink = size => {
  let result = "";

  const KIT = "abcdefghijklmnopqrstuvwxyz_$~1234567890-#@ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const KIT_LENGTH = KIT.length;

  for (let i = 0; i < size; i += 1) {
    result += KIT.charAt(Math.floor(Math.random() * KIT_LENGTH));
  }

  return result;
};  




module.exports = {
  async convertUrl(req, res) {
    try {
      const { url, visitLimit } = req.body;

      visitLimit = visitLimit < 1 || visitLimit > 100 ? 1 : visitLimit;

      if (!url) {
        return res.status(404).send({
          success: false,
          message: "No url found."
        });
      }

      if (url.length < 1) {
        return res.send(403).send({
          success: false,
          message: "No empty links available!"
        });
      }

      const foundUrl = (await LinkModel.findOne({ url }));

      if (foundUrl) {
        return res.send({
          success: true,
          url: foundUrl.url,
          shortLink: foundUrl.shortLink
        });
      }

      const tokenShort = shortenLink(6);

      const urlCreated = new LinkModel({
        url,
        shortLink: tokenShort,
        visitLimit
      });
      urlCreated
        .save()
        .then(() => {
          res.status(201).send({
            success: true,
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
          success: false,
          message: "Incorrect URL"
        });
      }

      if (foundUrl.visitNumber >= foundUrl.visitLimit) {
        LinkModel.deleteOne({ shortLink })
          .then(() => {
            return res.send({
              success: false,
              message: "This link has expired"
            });
          })
          .catch(e => {
            success: false,
            message: e
          });
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
      res.status(500).send({
        success: false,
        message: e
      });
    }
  }
};
