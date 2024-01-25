const Vegetable = require("../models/vegetable");
const User = require("../models/user");

exports.indexNotComplete = async function (req, res) {
  try {
    const vegetable = await Vegetable.find({
      isOrganic: false,
      user: req.user._id,
    });
    res.json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexComplete = async function (req, res) {
  try {
    const vegetable = await Vegetable.find({
      isOrganic: true,
      user: req.user._id,
    });
    res.json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createVegetable = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const vegetable = await Vegetable.create(req.body);
    req.user.vegetables
      ? req.user.vegetables.addToSet({ _id: vegetable._id })
      : (req.user.vegetables = [{ _id: vegetable._id }]);
    await req.user.save();
    res.json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateVegetable = async function (req, res) {
  try {
    const vegetable = await Vegetable.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showVegetable = async function (req, res) {
  try {
    const vegetable = await Vegetable.findOne({ _id: req.params.id });
    res.json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVegetable = async function (req, res) {
  try {
    const vegetable = await Vegetable.findOneAndDelete({ _id: req.params.id });
    res.json(vegetable);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
