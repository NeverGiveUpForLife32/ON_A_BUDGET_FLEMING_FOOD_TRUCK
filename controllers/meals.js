const Meal = require("../models/meal");
const User = require("../models/user");

exports.indexNotComplete = async function (req, res) {
  try {
    const meal = await Meal.find({ isReadyToEat: false, user: req.user._id });
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexComplete = async function (req, res) {
  try {
    const meal = await Meal.find({ isReadyToEat: true, user: req.user._id });
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createMenu = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const meal = await Meal.create(req.body);
    req.user.meals
      ? req.user.meals.addToSet({ _id: meal._id })
      : (req.user.meals = [{ _id: meal._id }]);
    await req.user.save();
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMenu = async function (req, res) {
  try {
    const meal = await Meal.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showMenu = async function (req, res) {
  try {
    const meal = await Meal.findOne({ _id: req.params.id });
    res.json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMenu = async function (req, res) {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id });
    res.json(meal);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
