import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

function MessagesContainer() {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => {
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);
  if (!selectedConversation)
    return <NoChatSelected username={authUser.username} />;

  return (
    selectedConversation && (
      <div className="flex flex-col min-w-[300px] md:min-w-[650px]">
        <div className="bg-slate-700 text-white font-bold text-xl py-4 px-6 flex items-center gap-2">
          <div className="w-12 rounded-full">
            <img src={selectedConversation.profilePic} alt="Profile Pic" />
          </div>
          <span>{selectedConversation.username}</span>
        </div>
        <Messages />
        <MessageInput />
      </div>
    )
  );
}
export default MessagesContainer;

const NoChatSelected = ({ username }) => {
  return (
    <div className="flex items-center justify-center h-full min-w-[300px] md:min-w-[650px]">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {username} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
