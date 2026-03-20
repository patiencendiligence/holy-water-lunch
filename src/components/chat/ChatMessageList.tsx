import { useEffect, useRef } from "react";
import { IMessage } from "@/types/chat";
import { ChatBubble } from "./ChatBubble";

interface ChatMessageListProps {
  messages: IMessage[];
  currentUser: string;
}

export const ChatMessageList = ({ messages, currentUser }: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          아직 메시지가 없어요.
          <br />
          첫 메시지를 보내보세요! 🍽️
        </div>
      )}

      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          user={msg.user}
          message={msg.message}
          isMine={msg.user === currentUser}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
