const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc Showing All Goals
// @route GET /api/goals
// @access private
module.exports.getGoals = asyncHandler(async (req, res) => {
  const allGoals = await Goal.find({ user: req.user._id });
  res.status(200).json(allGoals);
});

// @desc Adding New Goal
// @route POST /api/goals
// @access private
module.exports.setGoal = asyncHandler(async (req, res) => {
  const { goalText } = req.body;
  if (!goalText) {
    res.status(400);
    throw new Error("Text Field Required");
  }

  const newGoal = await Goal.create({ goalText, user: req.user._id });
  res.status(200).json(newGoal);
});

// @desc Edit Goal
// @route PUT /api/goals/:id
// @access private
module.exports.editGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { goalText } = req.body;
  const foundGoal = await Goal.findById(id);
  if (!foundGoal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }
  // check if the goal's user !== the signed in user
  if (foundGoal.user.toString() !== req.user._id.toString()) {
    console.log(foundGoal.user.toString());
    console.log(req.user._id.toString());
    res.status(401);
    throw new Error("User Not Authorized");
  }
  if (!goalText) {
    res.status(400);
    throw new Error("Please Add A goalText Field To Edit");
  }
  const edittedGoal = await Goal.findByIdAndUpdate(
    id,
    { goalText },
    { new: true }
  );
  res.status(200).json(edittedGoal);
});

// @desc Delete Goal
// @route DE;ETE /api/goals/:id
// @access private
module.exports.deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const foundGoal = await Goal.findById(id);
  if (!foundGoal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }
  // check if the goal's user !== the signed in user
  if (foundGoal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const deletedGoal = await Goal.findByIdAndDelete(id);
  res.status(200).json({ id });
});
