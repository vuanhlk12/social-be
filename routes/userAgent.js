const UserAgent = require("../models/UserAgent");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { cookie } = req.body || {};
    const oldUserAgent = await UserAgent.findOne({ cookie });
    if (oldUserAgent) {
      await oldUserAgent.updateOne({
        $set: { ...req.body, count: oldUserAgent.count + 1 },
      });
      res.status(200).json(`updated count ${oldUserAgent.count + 1}`);
    } else {
      const newUserAgent = new UserAgent(req.body);
      const savedUserAgent = await newUserAgent.save();
      res.status(200).json(savedUserAgent);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
