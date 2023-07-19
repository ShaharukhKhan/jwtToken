const jwt = require("jsonwebtoken");
const secret = "sharukh#$11234@srk";

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payload, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null; // Handle invalid or expired token
    }
}

module.exports = {
    setUser,
    getUser,
};
