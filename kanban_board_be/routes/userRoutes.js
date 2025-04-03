const express = require("express");
const User = require("../models/User"); // Make sure this path is correct
const router = express.Router();

// Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
