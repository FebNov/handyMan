const express = require("express");
const {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
  //   addJobToJob,
  //   removeJobFromJob,
} = require("../controllers/jobs");
const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", addJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
// router.post("/:id/jobs/:", addJobToJob);
// router.delete("/:id", removeJobFromJob);
module.exports = router;
