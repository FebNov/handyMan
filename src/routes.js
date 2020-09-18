const express = require("express");
const router = express.Router();
const serviceRoute = require("./routes/services");
const jobRoute = require("./routes/jobs");

router.use("/services", serviceRoute);
router.use("/jobs", jobRoute);
module.exports = router;
