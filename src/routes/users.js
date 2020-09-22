const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
  addUserTOCustomers,
  addUserTOTradies,
} = require("../controllers/users");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.post("/:id/services/:code", linkJobToService);
router.post("/:id/customers/:code", addUserTOCustomers);
router.post("/:id/tradies/:code", addUserTOTradies);
module.exports = router;
