const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");
const router = express.Router();

// Import the necessary middleware functions
const { restrictToLoggedinUserOnly, checkAuth } = require("../middlewares/auth");

// Route to handle generating a new short URL
router.post("/generate", restrictToLoggedinUserOnly, handleGenerateNewShortURL);

module.exports = router;
