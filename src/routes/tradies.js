const express = require("express");
const {
  getAllTradies,
  getTradie,
  addTradie,
  deleteTradie,
  updateTradie,
} = require("../controllers/tradies");
const router = express.Router();

router.get("/", getAllTradies);
router.get("/:id", getTradie);
router.post("/", addTradie);
router.put("/:id", updateTradie);
router.delete("/:id", deleteTradie);

module.exports = router;
