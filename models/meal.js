const { model, Schema } = require("mongoose");

const mealSchema = new Schema(
  {
    fruit: { type: String, required: true },
    vegetable: { type: String, required: true },
    proteinSource: { type: String, required: true },
    beverage: { type: String, required: true },
    desert: { type: Boolean, required: true },
    isReadytoEat: { type: Boolean, required: true },
    quantity: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
