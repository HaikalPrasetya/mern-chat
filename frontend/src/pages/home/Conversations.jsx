import Conversation from "../../components/Conversation";
import useConversations from "../../hooks/useConversations";
import { generateRandomEmoji } from "../../utils/EmojiGenerator";

function Conversations() {
  const { loading, conversations } = useConversations();
  return (
    <div className="my-4 flex flex-col gap-3 overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          emoji={generateRandomEmoji()}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}
export default Conversations;
