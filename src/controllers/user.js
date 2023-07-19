const { v4: uuidv4 } = require("uuid")
const User = require("../models/model");
const { setUser } = require('../service/auth')

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if the required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        await User.create({
            name,
            email,
            password,
        });

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to handle user signup' });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password })
        if (!user)
            return res.render("login", {
                erroe: "Invalid Username or Password",
            })


        const token = setUser(user);
        res.cookie("token", token);
        return res.redirect("/");
        // console.log(token);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to handle user signup' });
    }
}


module.exports = {
    handleUserSignup: handleUserSignup, handleUserLogin
};
