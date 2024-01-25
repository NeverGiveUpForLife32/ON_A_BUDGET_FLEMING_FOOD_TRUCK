const { model, Schema } = require("mongoose");

const proteinSchema = new Schema(
  {
    protein_source: { type: String, required: true },
    quantity: { Boolean, required: true },
    isOrganic: { type: Boolean, required: true },
    user: { type: Schema.Types.ObjectIs, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Protein = model("Protein", proteinSchema);

module.exports = Protein;
