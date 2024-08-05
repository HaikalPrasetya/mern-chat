import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utils/extrackTime";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = authUser._id === message.senderId;
  const positionBubble = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className="mx-2">
      <div className={`chat ${positionBubble}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profilePic} alt="Profile Pic" />
          </div>
        </div>
        <div
          className={`chat-bubble ${shakeClass} ${
            fromMe && "chat-bubble-info"
          }`}
        >
          {message.message}
        </div>
        <div className="text-sm font-semibold text-slate-500">
          {extractTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}
export default Message;
