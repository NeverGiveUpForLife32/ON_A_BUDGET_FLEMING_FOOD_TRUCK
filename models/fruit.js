const { model, Schema } = require("mongoose");

const fruitSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    isOrganic: { type: Boolean, required: true },
    isRipe: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Fruit = model("Fruit", fruitSchema);

module.exports = Fruit;
