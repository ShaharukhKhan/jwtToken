const express = require("express");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();
const URL = require("../models/url");

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
    try {
        // if (!req.user) return res.redirect('/login')
        const allUrls = await URL.find({});
        return res.render("home", {
            urls: allUrls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve URLs" });
    }
});

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
    try {
        // if (!req.user) return res.redirect('/login')
        const allUrls = await URL.find({ createdBy: req.user._id });
        return res.render("home", {
            urls: allUrls,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve URLs" });
    }
});

router.get("/", (req, res) => {
    return res.render("home");
})

router.get("/signup", (req, res) => {
    return res.render("signup");
});


router.get("/login", (req, res) => {
    return res.render("login");
});

// Assuming you have an instance of express named "app"
router.post('/generate-url', (req, res) => {
    // Retrieve the originalURL from the request body
    const { originalURL } = req.body;

    // Generate and save the URL logic goes here
    // ...

    // Redirect the user back to the home page after generating the URL
    res.redirect('/');
});

module.exports = router;
