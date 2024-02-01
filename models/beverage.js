const { model, Schema } = require("mongoose");

const beverageSchema = new Schema(
  {
    name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    isCold: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Beverage = model("Beverage", beverageSchema);

module.exports = Beverage;
