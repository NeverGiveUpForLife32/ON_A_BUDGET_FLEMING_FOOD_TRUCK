const { model, Schema } = require("mongoose");

const fruitSchema = new Schema(
  {
    name: { type: String, required: true },
    texture: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { Boolean, required: true },
    user: { type: Schema.Types.ObjectIs, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Fruit = model("Fruit", fruitSchema);

module.exports = Fruit;
