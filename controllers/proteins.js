const Protein = require("../models/protein");
const User = require("../models/user");

exports.indexNotComplete = async function (req, res) {
  try {
    const protein = await Protein.find({
      isOrganic: false,
      user: req.user._id,
    });
    res.json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexComplete = async function (req, res) {
  try {
    const protein = await Protein.find({ isOrganic: true, user: req.user._id });
    res.json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createProtein = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const protein = await Protein.create(req.body);
    req.user.proteins
      ? req.user.proteins.addToSet({ _id: protein._id })
      : (req.user.proteins = [{ _id: protein._id }]);
    await req.user.save();
    res.json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProtein = async function (req, res) {
  try {
    const protein = await Protein.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showProtein = async function (req, res) {
  try {
    const protein = await Protein.findOne({ _id: req.params.id });
    res.json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProtein = async function (req, res) {
  try {
    const protein = await Protein.findOneAndDelete({ _id: req.params.id });
    res.json(protein);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
