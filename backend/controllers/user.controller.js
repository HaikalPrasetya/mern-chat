import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const currentId = req.user._id;
    const users = await User.find({
      _id: { $ne: currentId },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, file } = req.body;
    const user = req.user;
    const filePath = req.file;
    let imgResult;
    if (filePath) {
      const { path } = req.file;
      imgResult = await cloudinary.uploader.upload(path);
    }
    const query = await User.findByIdAndUpdate(
      id,
      {
        username,
        profilePic: filePath ? imgResult.secure_url : user.profilePic,
      },
      { new: true }
    );
    if (query) {
      res.status(200).json(query);
    } else {
      res.status(400).json({ error: "Something went wrong!" });
    }
  } catch (error) {
    console.log(error);
  }
};
