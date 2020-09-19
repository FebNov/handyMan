const JobModel = require("../models/job");
const ServiceModel = require("../models/service");
const services = require("./services");

async function getAllJobs(req, res) {
  const job = await JobModel.find().exec();
  res.json(job);
}

async function getJob(req, res) {
  const { id } = req.params;
  const job = await JobModel.findById(id)
    .populate("services", "_id serviceName description")
    .exec();
  if (!job) {
    return res.status(404).json("job Not Found");
  }
  return res.json(job);
}

async function addJob(req, res) {
  const { jobName, description, visible } = req.body;
  const job = new JobModel({
    jobName,
    description,
    visible,
  });
  await job.save();
  return res.status(201).json(job);
}

async function deleteJob(req, res) {
  const { id } = req.params;
  const job = await JobModel.findByIdAndDelete(id);
  if (!job) {
    return res.status(404).json("job not found");
  }
  await ServiceModel.updateMany(
    { jobs: job._id },
    { $pull: { jobs: job._id } }
  ).exec();
  return res.sendStatus(200);
}

async function updateJob(req, res) {
  const { id } = req.params;
  const { jobName, visible, description } = req.body;
  const job = await JobModel.findByIdAndUpdate(
    id,
    { jobName, visible, description },
    { new: true }
  ).exec();

  if (!job) {
    return res.status(404).json("Job Not Found");
  }
  await job.save();
  return res.json(job);
}

async function linkJobToService(req, res) {
  // service id , job id get ,
  const { id, code } = req.params;
  const job = await JobModel.findById(id)
    .select("services jobName description")
    .exec();
  const service = await ServiceModel.findById(code)
    .select("jobs serviceName description")
    .exec();
  if (!job || !service) {
    return res.status(404).json("Job or Service Not Found");
  }
  job.services.addToSet(service._id);
  service.job.addToSet(job._id);
  await job.save();
  await service.save();
  return res.json(job);
}

//1 v 1
// service 下面可以有很多个job
//job 下面只有1个service
async function removeJobFromService(req, res) {
  const { id, code } = req.params;
  const job = await JobModel.findById(id).select("services jobName").exec();
  const service = await ServiceModel.findById(code).select("jobs").exec();
  if (!job || !service) {
    return res.status(404).json("Job or Service Not Found");
  }
  const oldLength = job.services.length;

  // console.log(job);
  // console.log(job.services);
  // console.log(service._id);
  job.services.pull(service._id);

  if (job.services.length === oldLength) {
    return res.status(404).json("Does not exist");
  }
  service.jobs.pull(job._id);
  await job.save();
  await service.save();

  return res.json(job);
}
module.exports = {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  linkJobToService,
  removeJobFromService,
};
