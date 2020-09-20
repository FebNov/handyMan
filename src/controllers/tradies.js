const UserModel = require("../models/user");
const TradieModel = require("../models/tradie");

async function getAllTradies(req, res) {
  const tradie = await TradieModel.find().exec();
  res.json(tradie);
}

async function getTradie(req, res) {
  const { id } = req.params;
  const tradie = await TradieModel.findById(id)
    // .populate("services", "_id serviceName description")
    .exec();
  if (!tradie) {
    return res.status(404).json("tradie Not Found");
  }
  return res.json(tradie);
}

async function addTradie(req, res) {
  const { _id, workTime } = req.body;
  const tradie = new TradieModel({
    email,
    _id,
    workTime,
  });
  await tradie.save();
  return res.status(201).json(tradie);
}

async function deleteTradie(req, res) {
  const { id } = req.params;
  const tradie = await TradieModel.findByIdAndDelete(id);
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
  const { id } = req.params;
  const { _id, workTime } = req.body;
  const tradie = await TradieModel.findByIdAndUpdate(
    id,
    { _id, workTime },
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
