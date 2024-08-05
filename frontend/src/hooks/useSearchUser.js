import useConversations from "./useConversations";
import useConversation from "../zustand/useConversation";

function useSearchUser() {
  const { setSelectedConversation } = useConversation();
  const { conversations } = useConversations();

  const searchUser = (searchString) => {
    const findUser = conversations.find((user) =>
      user.username.toLowerCase().includes(searchString.toLowerCase())
    );
    if (!findUser) return;
    setSelectedConversation(findUser);
  };

  return { searchUser };
}
export default useSearchUser;
