const Dessert = require("../models/dessert");
const User = require("../models/user");

exports.indexNotDelicious = async function (req, res) {
  try {
    const dessert = await Dessert.find({
      isDelicious: false,
      user: req.user._id,
    });
    res.status(200).json(dessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexDelicious = async function (req, res) {
  try {
    const dessert = await Dessert.find({
      isDelicious: true,
      user: req.user._id,
    });
    res.status(200).json(dessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createDessert = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const dessert = await Dessert.create(req.body);
    req.user.desserts
      ? req.user.desserts.addToSet({ _id: dessert._id })
      : (req.user.desserts = [{ _id: dessert._id }]);
    await req.user.save();
    res.status(200).json(dessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDessert = async function (req, res) {
  try {
    const dessert = await Dessert.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(dessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showDessert = async function (req, res) {
  try {
    const dessert = await Dessert.findOne({ _id: req.params.id });
    res.json(dessert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDessert = async function (req, res) {
  try {
    const dessert = await Dessert.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
