const UserModel = require("../models/user");
const TradieModel = require("../models/tradie");

async function getAllTradies(req, res) {
  const tradie = await TradieModel.find().exec();
  res.json(tradie);
}

async function getTradie(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findById(tradieId)
    .populate("users", "_id firstName lastName")
    .exec();
  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  return res.json(tradie);
}

async function addTradie(req, res) {
  const { tradieId, workTime } = req.body;
  const existTradie = await TradieModel.findById(tradieId).exec();
  if (existTradie) {
    return res.status(409).json("Already Existed");
  }
  const tradie = new TradieModel({
    tradieId,
    workTime,
  });

  await tradie.save();
  return res.status(201).json(tradie);
}

async function deleteTradie(req, res) {
  const { id: tradieId } = req.params;
  const tradie = await TradieModel.findByIdAndDelete(tradieId);
  if (!tradie) {
    return res.status(404).json("tradie not found");
  }
  //TO DO
  // await ServiceModel.updateMany(
  //   { jobs: job._id },
  //   { $pull: { jobs: job._id } }
  // ).exec();
  return res.sendStatus(200);
}

async function updateTradie(req, res) {
  const { id: tradieId } = req.params;
  const { workTime } = req.body;
  const tradie = await TradieModel.findByIdAndUpdate(
    tradieId,
    { workTime },
    { new: true }
  ).exec();

  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  await tradie.save();
  return res.json(tradie);
}

module.exports = {
  getAllTradies,
  getTradie,
  addTradie,
  deleteTradie,
  updateTradie,
};
