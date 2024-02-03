const Meal = require("../models/meal");
const User = require("../models/user");

exports.indexNotReadyToEat = async function (req, res) {
  try {
    const menu = await Meal.find({
      isReadyToEat: false,
    });

    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexReadyToEat = async function (req, res) {
  try {
    const meal = await Meal.find({ isReadyToEat: true, user: req.user._id });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createMeal = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const meal = await Meal.create(req.body);
    req.user.meals
      ? req.user.meals.addToSet({ _id: meal._id })
      : (req.user.meals = [{ _id: meal._id }]);
    await req.user.save();
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMeal = async function (req, res) {
  try {
    const meal = await Meal.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showMeal = async function (req, res) {
  try {
    const meal = await Meal.findOne({ _id: req.params.id });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMeal = async function (req, res) {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
