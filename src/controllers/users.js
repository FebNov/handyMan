const UserModel = require("../models/user");
const CustomerModel = require("../models/customer");
const TradieModel = require("../models/tradie");
async function getAllUsers(req, res) {
  const user = await UserModel.find().exec();
  res.json(user);
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findById(id)
    .populate("customers")
    .populate("tradies")
    .exec();
  if (!user) {
    return res.status(404).json("user Not Found");
  }
  return res.json(user);
}

async function addUser(req, res) {
  const { email, firstName, lastName } = req.body;
  const user = new UserModel({
    email,
    firstName,
    lastName,
  });
  await user.save();
  return res.status(201).json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json("user not found");
  }
  //TO DO
  // await ServiceModel.updateMany(
  //   { jobs: job._id },
  //   { $pull: { jobs: job._id } }
  // ).exec();
  return res.sendStatus(200);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { email, firstName, lastName } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { email, firstName, lastName },
    { new: true }
  ).exec();

  if (!user) {
    return res.status(404).json("user Not Found");
  }
  await user.save();
  return res.json(user);
}

// async function linkJobToService(req, res) {
//   // service id , job id get ,
//   const { id, code } = req.params;
//   const job = await JobModel.findById(id)
//     .select("services jobName description")
//     .exec();
//   const service = await ServiceModel.findById(code)
//     .select("jobs serviceName description")
//     .exec();
//   if (!job || !service) {
//     return res.status(404).json("Job or Service Not Found");
//   }
//   if (job.services.length == 0) {
//     job.services.addToSet(service._id);
//     // console.log(service._id);
//     // console.log(job._id);
//     service.jobs.addToSet(job._id);
//     await job.save();
//     await service.save();
//     console.log("link successful beteween job and service");
//     return res.json(job);
//   } // 相同job关联别的service  // To Ask 再 service.jobs 更改select 的值会影响到取它么？
//   else {
//     const copyItem = job.services.slice();
//     // console.log(copyItem); //[1]
//     const jobServicesExistedItem = copyItem[0];
//     // console.log(jobServicesExistedItem); //1   == service._id
//     const preService = await ServiceModel.findById(jobServicesExistedItem)
//       .select("jobs")
//       .exec();
//     // console.log(preService);
//     // console.log(preService.jobs); //找到之前关联的service信息
//     // console.log(job._id);
//     preService.jobs.pull(job._id); //取消之前service的关联
//     await preService.save();
//     job.services.pop();
//     job.services.addToSet(service._id);
//     service.jobs.addToSet(job._id);
//     await job.save();
//     await service.save();
//     console.log("Update Link");
//     return res.json(job);
//   }
// }

// //1 v 1
// // service 下面可以有很多个job
// //job 下面只有1个service
// async function removeJobFromService(req, res) {
//   const { id, code } = req.params;
//   const job = await JobModel.findById(id).select("services jobName").exec();
//   const service = await ServiceModel.findById(code).select("jobs").exec();
//   if (!job || !service) {
//     return res.status(404).json("Job or Service Not Found");
//   }
//   const oldLength = job.services.length;
//   job.services.pull(service._id);
//   if (job.services.length === oldLength) {
//     return res.status(404).json("Does not exist");
//   }
//   service.jobs.pull(job._id);
//   await job.save();
//   await service.save();

//   return res.json(job);
// }

async function addUserTOCustomers(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id customers").exec();
  const customer = await CustomerModel.findById(code)
    .select("customerId ContactNo address users")
    .exec();
  if (!user || !customer) {
    return res.status(404).json("User or Customer Not Found");
  }

  if (user.customers.length == 0) {
    user.customers.addToSet(customer._id);
    customer.users.addToSet(user._id);
    await user.save();
    await customer.save();
    console.log("This user is a customer");
    return res.json(user);
  } else {
    const copyItem = user.customers.slice();
    // console.log(copyItem); //[1]
    const userCustomerExistedItem = copyItem[0];
    const preCustomer = await CustomerModel.findById(userCustomerExistedItem)
      .select("users")
      .exec();

    preCustomer.users.pull(user._id);
    await preCustomer.save();
    user.customers.pop();
    user.customers.addToSet(customer._id);
    customer.users.addToSet(user._id);
    await user.save();
    await customer.save();
    console.log("Update Link");
    return res.json(user);
  }
}
async function addUserTOTradies(req, res) {
  const { id, code } = req.params;
  const user = await UserModel.findById(id).select("id tradies ").exec();
  const tradie = await TradieModel.findById(code)
    .select("tradieId users workTime")
    .exec();
  if (!user || !tradie) {
    return res.status(404).json("User or tradie Not Found");
  }
  if (user.tradies.length == 0) {
    user.tradies.addToSet(tradie._id);
    // console.log(tradie._id);
    // console.log(user._id);
    tradie.users.addToSet(user._id);
    await user.save();
    await tradie.save();
    console.log("This user is a tradie");
    return res.json(user);
  } else {
    const copyItem = user.tradies.slice();
    // console.log(copyItem); //[1]
    const userTradieExistedItem = copyItem[0];
    const preTradie = await TradieModel.findById(userTradieExistedItem)
      .select("users")
      .exec();
    // console.log(preTradie);
    // console.log(preTradie.users);
    // console.log(user._id);
    preTradie.users.pull(user._id);
    await preTradie.save();
    user.tradies.pop();
    user.tradies.addToSet(tradie._id);
    tradie.users.addToSet(user._id);
    await user.save();
    await tradie.save();
    console.log("Update Link");
    return res.json(user);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  addUserTOCustomers,
  addUserTOTradies,
};
