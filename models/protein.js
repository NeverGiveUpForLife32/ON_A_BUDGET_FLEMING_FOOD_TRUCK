const { model, Schema } = require("mongoose");

const proteinSchema = new Schema(
  {
    proteinSourceName: { type: String, required: true },
    specialRequests: { type: String, required: true },
    quantity: { type: Number, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Protein = model("Protein", proteinSchema);

module.exports = Protein;
