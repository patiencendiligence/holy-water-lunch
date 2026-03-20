import { getUserBubbleColor } from "@/utils/chat";

interface ChatBubbleProps {
  user: string;
  message: string;
  isMine: boolean;
}

export const ChatBubble = ({ user, message, isMine }: ChatBubbleProps) => {
  const bubbleColor = isMine ? "#3b82f6" : getUserBubbleColor(user);

  return (
    <div
      style={{
        display: "flex",
        marginBottom: "12px",
        justifyContent: isMine ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: isMine ? "flex-end" : "flex-start",
        }}
      >
        {!isMine && (
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              marginBottom: "4px",
              marginLeft: "8px",
            }}
          >
            {user}
          </p>
        )}
        <div
          style={{
            padding: "10px 16px",
            borderRadius: "16px",
            borderBottomRightRadius: isMine ? "4px" : "16px",
            borderBottomLeftRadius: isMine ? "16px" : "4px",
            backgroundColor: bubbleColor,
            color: "#ffffff",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              margin: 0,
              wordBreak: "break-word",
            }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
