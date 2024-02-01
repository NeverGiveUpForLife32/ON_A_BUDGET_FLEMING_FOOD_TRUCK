const Protein = require("../models/protein");
const User = require("../models/user");

exports.indexNotOrganic = async function (req, res) {
  try {
    const protein = await Protein.find({
      isOrganic: false,
      user: req.user._id,
    });
    res.status(200).json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexOrganic = async function (req, res) {
  try {
    const protein = await Protein.find({ isOrganic: true, user: req.user._id });
    res.status(200).json(protein);
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
    res.status(200).json(protein);
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
    res.status(200).json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showProtein = async function (req, res) {
  try {
    const protein = await Protein.findOne({ _id: req.params.id });
    res.status(200).json(protein);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProtein = async function (req, res) {
  try {
    const protein = await Protein.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
