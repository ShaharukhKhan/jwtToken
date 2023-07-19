const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const ejs = require("ejs");
const path = require("path");
require("../src/db/conn");
const User = require("../src/models/model");
const urlRoute = require("./routes/url"); // Added "require" keyword
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const port = process.env.PORT || 8000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/",  staticRoute);
app.use(checkForAuthentication)


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Corrected property name to "views"

app.listen(port, () => {
    console.log(`Connection is live at port no. ${port}`);
});
