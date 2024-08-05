import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json({ error: "You don't have any cookies" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return res.status(400).json({ error: "Token not provided" });
    return decode;
  });
  try {
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export default protectedRoute;
