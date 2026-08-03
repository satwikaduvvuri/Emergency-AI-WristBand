const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      default: "Emergency SOS Triggered",
    },

    status: {
      type: String,
      default: "Sent",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.SOS || mongoose.model("SOS", sosSchema);