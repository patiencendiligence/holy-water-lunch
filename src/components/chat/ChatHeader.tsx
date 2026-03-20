import SvgButton from "@/components/common/SvgButton";

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
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <SvgButton width={80} color="#06b6d4" text="뒤로" />
        </button>
      )}
    </div>
  );
};
