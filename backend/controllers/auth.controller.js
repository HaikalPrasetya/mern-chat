import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // CHECK PASSWORD IS MATCH OR NOT
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match!" });
    }
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // DETERMINE A PROFILE PIC BASED OF GENDER
    const profilePicForMale = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const profilePicForFemale = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // CREATE NEW USER
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? profilePicForMale : profilePicForFemale,
    });
    await newUser.save();
    // GENERATE TOKEN JWT
    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(500).json({ error: "Internal server error!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
    if (match && user) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400).json({ error: "Username or password is wrong!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
