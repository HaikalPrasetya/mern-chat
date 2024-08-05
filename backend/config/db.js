import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
