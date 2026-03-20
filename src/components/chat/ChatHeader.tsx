interface ChatHeaderProps {
  username: string;
  connected: boolean;
  userCount: number;
  onBack?: () => void;
}

export const ChatHeader = ({ username, connected, userCount, onBack }: ChatHeaderProps) => {
  return (
    <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-start">
      <div>
        <p className="font-bold text-lg text-white">{username || "로딩중..."}님 👋</p>
        <p className="text-xs text-gray-400" style={{ fontSize: "10px" }}>
          {connected
            ? `🟢 연결됨 · 👥 ${userCount}명 접속 중`
            : "🔴 연결 중..."}
        </p>
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
        >
          뒤로가기
        </button>
      )}
    </div>
  );
};
