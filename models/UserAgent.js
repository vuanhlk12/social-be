const mongoose = require("mongoose");

const UserAgentSchema = new mongoose.Schema(
  {
    info: {
      type: Array,
    },
    cookie: {
      type: String,
    },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserAgent", UserAgentSchema);
