import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import useConversation from "../zustand/useConversation";
import Message from "./Message";
import Skeleton from "../components/Skeleton";

function Messages() {
  const { loading } = useGetMessages();
  useListenMessages();
  const { selectedConversation, messages } = useConversation();
  const msgRef = useRef();

  useEffect(() => {
    const int = setTimeout(() => {
      msgRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearInterval(int);
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 my-1 overflow-scroll h-[90%]">
      {loading && <Skeleton />}
      {!loading && messages.length === 0 && (
        <span className="text-center font-semibold text-xl text-wrap max-w-[400px] mx-auto">
          You never chat with {selectedConversation.username}, {"Let's"} start
          to create conversation with {selectedConversation.username}
        </span>
      )}
      {messages.map((message) => (
        <div key={message?._id} ref={msgRef}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
}
export default Messages;
