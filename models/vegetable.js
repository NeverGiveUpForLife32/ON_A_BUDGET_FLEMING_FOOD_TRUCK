const { model, Schema } = require("mongoose");

const vegetableSchema = new Schema(
  {
    name: { type: String, required: true },
    texture: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { Boolean, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectIs, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Vegetable = model("Vegetable", vegetableSchema);

module.exports = Vegetable;
