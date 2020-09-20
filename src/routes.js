const express = require("express");
const router = express.Router();
const serviceRoute = require("./routes/services");
const jobRoute = require("./routes/jobs");
const userRoute = require("./routes/users");

router.use("/services", serviceRoute);
router.use("/jobs", jobRoute);
router.use("/users", userRoute);
module.exports = router;
