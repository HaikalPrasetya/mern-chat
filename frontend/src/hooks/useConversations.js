import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setConversations(data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return { loading, conversations };
}
export default useConversations;
