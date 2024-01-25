const Deserts = require("../models/desert");
const User = require("../models/user");

exports.indexNotComplete = async function (req, res) {
  try {
    const desert = await Desert.find({
      isDelicious: false,
      user: req.user._id,
    });
    res.json(deserts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.indexComplete = async function (req, res) {
  try {
    const desert = await Desert.find({ isDelicious: true, user: req.user._id });
    res.json(deserts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createDesert = async function (req, res) {
  try {
    req.body.user = req.user._id;
    const desert = await Desert.create(req.body);
    req.user.deserts
      ? req.user.deserts.addToSet({ _id: desert._id })
      : (req.user.deserts = [{ _id: desert._id }]);
    await req.user.save();
    res.json(desert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDesert = async function (req, res) {
  try {
    const desert = await Desert.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(desert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.showDesert = async function (req, res) {
  try {
    const desert = await Desert.findOne({ _id: req.params.id });
    res.json(desert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDesert = async function (req, res) {
  try {
    const desert = await Desert.findOneAndDelete({ _id: req.params.id });
    res.json(desert);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
};
