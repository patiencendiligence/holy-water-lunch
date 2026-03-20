interface ChatHeaderProps {
  username: string;
  connected: boolean;
  userCount: number;
  onBack?: () => void;
}

export const ChatHeader = ({ username, connected, userCount, onBack }: ChatHeaderProps) => {
  return (
    <div
      style={{
        padding: "12px 16px",
        backgroundColor: "#1f2937",
        borderBottom: "1px solid #374151",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#ffffff",
            margin: 0,
          }}
        >
          {username || "로딩중..."}님 👋
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            margin: "4px 0 0 0",
          }}
        >
          {connected
            ? `🟢 연결됨 · 👥 ${userCount}명 접속 중`
            : "🔴 연결 중..."}
        </p>
      </div>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            backgroundColor: "#06b6d4",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          뒤로가기
        </button>
      )}
    </div>
  );
};
