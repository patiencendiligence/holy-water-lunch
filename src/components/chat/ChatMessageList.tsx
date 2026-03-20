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
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        paddingBottom: "96px",
      }}
    >
      {messages.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "40px",
            fontSize: "12px",
          }}
        >
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
