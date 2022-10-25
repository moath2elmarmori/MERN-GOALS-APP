const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // req.headers.authorization seems like this "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // verfiy token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // insert the user data in the request object
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

module.exports = { protect };
