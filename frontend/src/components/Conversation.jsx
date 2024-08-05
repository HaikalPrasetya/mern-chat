import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import useGetConversationById from "../hooks/useGetConversationById";
import { useEffect, useState } from "react";
import useConversations from "../zustand/useConversation";

function Conversation({ conversation, lastIdx, emoji }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { messages } = useConversations();
  const isOnline = onlineUsers.includes(conversation._id);
  const [lastMessageText, setLastMessageText] = useState("");

  const { loading, getConversationById } = useGetConversationById();

  useEffect(() => {
    const getConversation = async () => {
      const result = await getConversationById(conversation._id);
      setLastMessageText(result.message);
    };
    if (conversation._id) getConversation();
  }, [conversation._id, messages]);

  return (
    <div onClick={() => setSelectedConversation(conversation)}>
      <div
        className={`flex items-center justify-between cursor-pointer hover:bg-blue-500 rounded px-4 py-2 transition-all ease-in-out duration-150 ${
          selectedConversation?._id === conversation._id && "bg-blue-500"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`avatar ${isOnline && "online"}`}>
            <div className="w-12 rounded-full">
              <img src={conversation.profilePic} alt="profile pic" />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{conversation.username}</h3>
            <div className="text-slate-500 ">{lastMessageText}</div>
          </div>
        </div>
        <div className="text-2xl">{emoji}</div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </div>
  );
}
export default Conversation;
