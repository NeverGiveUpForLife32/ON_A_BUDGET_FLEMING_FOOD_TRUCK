const { model, Schema } = require("mongoose");

const mealSchema = new Schema(
  {
    specialRequests: { type: String, required: true },
    isReadyToEat: { type: Boolean, required: true },
    is$20Each: { type: Boolean, required: true },
    quantity: { type: Number, required: true },
    fruit: { type: Schema.Types.ObjectId, ref: "Fruit" },
    vegetable: {
      type: Schema.Types.ObjectId,
      ref: "Vegetable",
    },
    protein: { type: Schema.Types.ObjectId, ref: "Protein" },
    dessert: { type: Schema.Types.ObjectId, ref: "Dessert" },
    beverage: { type: Schema.Types.ObjectId, ref: "Beverage" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Meal = model("Meal", mealSchema);

module.exports = Meal;
