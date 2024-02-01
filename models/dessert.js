const { model, Schema } = require("mongoose");

const dessertSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isSliced: { type: Boolean, required: true },
    isDelicious: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Dessert = model("Dessert", dessertSchema);

module.exports = Dessert;
