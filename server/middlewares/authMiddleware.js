const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "You are not logged in!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //get user without password
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) {
        return res.status(401).json({ message: "The user doesn't exist anymore" });
    }
    req.user = user;
    next();
}
module.exports = {protect};
