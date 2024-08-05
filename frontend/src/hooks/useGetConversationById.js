import { useState } from "react";
import toast from "react-hot-toast";

function useGetConversationById() {
  const [loading, setLoading] = useState(false);

  const getConversationById = async (receiverId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/conversation/${receiverId}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return data.lastMessage;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getConversationById };
}
export default useGetConversationById;
