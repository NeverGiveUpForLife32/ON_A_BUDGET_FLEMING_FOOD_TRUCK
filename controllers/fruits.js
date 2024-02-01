const Fruit = require("../models/fruit");
const User = require("../models/user");

exports.indexNotRipe = async function (req, res) {
  try {
    const fruit = await Fruit.find({ isRipe: false, user: req.user._id });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexRipe = async function (req, res) {
  try {
    const fruit = await Fruit.find({ isRipe: true, user: req.user._id });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createFruit = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const fruit = await Fruit.create(req.body);
    req.user.fruits
      ? req.user.fruits.addToSet({ _id: fruit._id })
      : (req.user.fruits = [{ _id: fruit._id }]);
    await req.user.save();
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFruit = async function (req, res) {
  try {
    const fruit = await Fruit.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showFruit = async function (req, res) {
  try {
    const fruit = await Fruit.findOne({ _id: req.params.id });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteFruit = async function (req, res) {
  try {
    const fruit = await Fruit.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
