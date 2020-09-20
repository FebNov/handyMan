const UserModel = require("../models/user");
const CustomerModel = require("../models/customer");

async function getAllCustomers(req, res) {
  const customer = await CustomerModel.find().exec();
  res.json(customer);
}

async function getCustomer(req, res) {
  const { id } = req.params;
  const customer = await CustomerModel.findById(id)
    // .populate("services", "_id serviceName description")
    .exec();
  if (!customer) {
    return res.status(404).json("customer Not Found");
  }
  return res.json(customer);
}

async function addCustomer(req, res) {
  const { _id, ContactNo } = req.body;
  const user = new CustomerModel({
    email,
    _id,
    ContactNo,
  });
  await user.save();
  return res.status(201).json(user);
}

async function deleteCustomer(req, res) {
  const { id } = req.params;
  const customer = await CustomerModel.findByIdAndDelete(id);
  if (!customer) {
    return res.status(404).json("customer not found");
  }
  //TO DO
  // await ServiceModel.updateMany(
  //   { jobs: job._id },
  //   { $pull: { jobs: job._id } }
  // ).exec();
  return res.sendStatus(200);
}

async function updateCustomer(req, res) {
  const { id } = req.params;
  const { _id, ContactNo } = req.body;
  const customer = await CustomerModel.findByIdAndUpdate(
    id,
    { _id, ContactNo },
    { new: true }
  ).exec();

  if (!customer) {
    return res.status(404).json("customer Not Found");
  }
  await customer.save();
  return res.json(customer);
}

module.exports = {
  getAllCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
};
