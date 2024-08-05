import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
      { type: mongoose.Types.ObjectId, ref: "Message", required: true },
    ],
    lastMessage: { type: mongoose.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
