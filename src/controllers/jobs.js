const JobModel = require("../models/job");

async function getAllJobs(req, res) {
  const job = await JobModel.find().exec();
  res.json(job);
}

async function getJob(req, res) {
  const { id } = req.params;
  const job = await JobModel.findById(id).exec();
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
  const student = await JobModel.findByIdAndDelete(id);
  if (!student) {
    return res.status(404).json("student not found");
  }
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

async function addJobToJob(req, res) {}
async function removeJobFromJob(req, res) {}
module.exports = {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  addJobToJob,
  removeJobFromJob,
};
