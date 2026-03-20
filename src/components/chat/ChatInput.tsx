import { useState, useCallback } from "react";

interface ChatInputProps {
  connected: boolean;
  onSend: (message: string) => void;
}

export const ChatInput = ({ connected, onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  }, [message, onSend]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1f2937",
        borderTop: "1px solid #374151",
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          maxWidth: "990px",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          style={{
            flex: 1,
            backgroundColor: "rgba(187, 187, 187, 0.25)",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "10px 16px",
            border: "none",
            outline: "none",
            fontSize: "14px",
          }}
          placeholder={connected ? "메시지를 입력하세요..." : "연결 중...🕐"}
          disabled={!connected}
        />
        <button
          onClick={handleSubmit}
          disabled={!connected || !message.trim()}
          style={{
            backgroundColor: !connected || !message.trim() ? "#4b5563" : "#3b82f6",
            color: "#ffffff",
            borderRadius: "9999px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: !connected || !message.trim() ? "not-allowed" : "pointer",
            marginLeft: "10px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
