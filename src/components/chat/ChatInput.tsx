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
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3 safe-area-bottom">
      <div className="flex items-center gap-2 max-w-[990px] mx-auto">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          style={{ backgroundColor: "#bbbbbb40" }}
          placeholder={connected ? "메시지를 입력하세요..." : "연결 중...🕐"}
          disabled={!connected}
        />
        <button
          onClick={handleSubmit}
          disabled={!connected || !message.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          style={{ marginLeft: "10px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
