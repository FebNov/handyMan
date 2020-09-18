const JobModel = require("../models/job");

async function getAllJobs(req, res) {
  const job = await JobModel.find().exec();
  res.json(job);
}

function getJob() {}

async function addJob(req, res) {
  const service = new JobModel({ _id: "c01", serviceName: "CLean" });
  await service.save();
  return res.json(service);
}
function deleteJob() {}
function updateJob() {}
function addJobToJob() {}
function removeJobFromJob() {}
module.exports = {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  addJobToJob,
  removeJobFromJob,
};
