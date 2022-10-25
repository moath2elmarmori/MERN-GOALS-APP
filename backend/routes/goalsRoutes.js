const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  editGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, editGoal).delete(protect, deleteGoal);

module.exports = router;
