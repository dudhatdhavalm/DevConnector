const express = require("express");
const router = express.Router();

// @route GET /api/users/test
// @desc test users
// @access public
router.get("/test", (req, res) => {
  res.json({ message: "User test" });
});

module.exports = router;
