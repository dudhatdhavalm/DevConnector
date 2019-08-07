const express = require("express");
const router = express.Router();

// @route GET /api/posts/test
// @desc test post
// @access public
router.get("/test", (req, res) => {
  res.json({ message: "Post test" });
});

module.exports = router;
