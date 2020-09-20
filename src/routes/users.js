const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
//   linkUserToService,
//   removeUserFromService,
} = require("../controllers/users");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.post("/:id/services/:code", linkJobToService);
// router.delete("/:id/services/:code", removeJobFromService);
module.exports = router;
