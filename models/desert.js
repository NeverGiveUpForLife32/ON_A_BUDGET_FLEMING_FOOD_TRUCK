const { model, Schema } = require("mongoose");

const desertSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Boolean, required: true },
    isDelicious: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Desert = model("Desert", desertSchema);

module.exports = Desert;
