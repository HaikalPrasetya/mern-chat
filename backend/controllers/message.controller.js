import Message from "../models/message.model.js";
import Conversation from "../models/Conversation.model.js";
import { getReceiverId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const currentUserId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, receiverId] },
    }).select("messages");
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [currentUserId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId: currentUserId,
      receiverId,
      message,
    });
    conversation.messages.push(newMessage);
    conversation.lastMessage = newMessage;
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const currentUserId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, receiverId] },
    }).populate("messages");
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const user = req.user;
    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, user._id] },
    }).populate("lastMessage");
    const lastMessage = conversation?.lastMessage;
    if (!lastMessage) {
      return res.status(200).json({ lastMessage: "" });
    }
    return res.status(200).json({ lastMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
