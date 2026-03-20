import { getUserBubbleColor } from "@/utils/chat";

interface ChatBubbleProps {
  user: string;
  message: string;
  isMine: boolean;
}

export const ChatBubble = ({ user, message, isMine }: ChatBubbleProps) => {
  const bubbleColor = isMine ? "bg-blue-500" : getUserBubbleColor(user);

  return (
    <div className={`flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"}`}>
        {!isMine && (
          <p className="text-xs text-gray-400 mb-1 ml-2">{user}</p>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-white ${bubbleColor} ${
            isMine ? "rounded-br-sm" : "rounded-bl-sm"
          }`}
        >
          <p className="text-sm break-words">{message}</p>
        </div>
      </div>
    </div>
  );
};
