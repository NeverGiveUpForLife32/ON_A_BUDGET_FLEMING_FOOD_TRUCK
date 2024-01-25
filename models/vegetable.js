const { model, Schema } = require("mongoose");

const vegetableSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Boolean, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Vegetable = model("Vegetable", vegetableSchema);

module.exports = Vegetable;
