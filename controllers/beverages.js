const Beverage = require("../models/beverage");
const User = require("../models/user");

exports.indexNotCold = async function (req, res) {
  try {
    const beverage = await Beverage.find({ isCold: false, user: req.user._id });
    res.status(200).json(beverage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexCold = async function (req, res) {
  try {
    const beverage = await Beverage.find({ isCold: true, user: req.user._id });
    res.status(200).json(beverage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createBeverage = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const beverage = await Beverage.create(req.body);
    req.user.beverages
      ? req.user.beverages.addToSet({ _id: beverage._id })
      : (req.user.beverages = [{ _id: beverage._id }]);
    await req.user.save();
    res.status(200).json(beverage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBeverage = async function (req, res) {
  try {
    const beverage = await Beverage.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(beverage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showBeverage = async function (req, res) {
  try {
    const beverage = await Beverage.findOne({ _id: req.params.id });
    res.status(200).json(beverage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBeverage = async function (req, res) {
  try {
    const beverage = await Beverage.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
