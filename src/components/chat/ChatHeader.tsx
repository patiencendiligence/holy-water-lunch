interface ChatHeaderProps {
  username: string;
  connected: boolean;
  userCount: number;
}

export const ChatHeader = ({ username, connected, userCount }: ChatHeaderProps) => {
  return (
    <div className="mt-3 px-4 py-3 bg-gray-800 border-b border-gray-700">
      <p className="font-bold text-lg text-white">{username}님 👋</p>
      <p className="text-xs text-gray-400" style={{ fontSize: "10px" }}>
        {connected
          ? `🟢 연결됨 · 👥 ${userCount}명 접속 중`
          : "🔴 연결 중..."}
      </p>
    </div>
  );
};
