import Layout from "@/components/common/Layout";
import { Feelings, Foods } from "@/constants";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import Pusher from "pusher-js";

type IMessage = {
  user: string;
  message: string;
};

const nameMaker = function () {
  return `${Feelings[Math.floor(Math.random() * Feelings.length)]} ${Foods[Math.floor(Math.random() * Foods.length)]}`;
};

const BUBBLE_COLORS = [
  "bg-teal-400",
  "bg-amber-400",
  "bg-blue-500",
  "bg-rose-400",
  "bg-purple-400",
  "bg-emerald-400",
  "bg-orange-400",
  "bg-pink-400",
];

const getUserColor = (username: string) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BUBBLE_COLORS[Math.abs(hash) % BUBBLE_COLORS.length];
};

const Chatting = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = nameMaker();
    setUsername(name);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
        transport: "ajax",
        params: { username: name },
      },
    });

    const presenceChannel = pusher.subscribe("presence-chat");
    
    presenceChannel.bind("pusher:subscription_succeeded", (members: any) => {
      setUserCount(members.count);
      setConnected(true);
    });

    presenceChannel.bind("pusher:member_added", () => {
      setUserCount((prev) => prev + 1);
    });

    presenceChannel.bind("pusher:member_removed", () => {
      setUserCount((prev) => Math.max(0, prev - 1));
    });

    const chatChannel = pusher.subscribe("chat");
    
    chatChannel.bind("message", (message: IMessage) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      presenceChannel.unbind_all();
      presenceChannel.unsubscribe();
      chatChannel.unbind_all();
      chatChannel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessageHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSendMessage(event.target.value);
    },
    []
  );

  const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitSendMessage(event);
    }
  };

  const submitSendMessage = async (
    event:
      | React.FormEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (sendMessage && sendMessage !== "") {
      const message: IMessage = {
        user: username,
        message: sendMessage,
      };

      await fetch("/api/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      setSendMessage("");
    }
  };

  const isMyMessage = (user: string) => user === username;

  return (
    <div className="flex flex-col h-screen bg-slate-900 w-full">
      <div className="flex-1 flex flex-col w-full max-w-[990px] mx-auto">
        {/* Header */}
        <div className="px-4 py-4 flex justify-between items-start">
          <div>
            <p className="font-bold text-xl text-white">
              {username}님 👋
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {connected ? `🟢 연결됨   👥 ${userCount}명 접속 중` : "🔴 연결 중..."}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            뒤로가기
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {chat.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>아직 메시지가 없어요.</p>
              <p className="mt-2">첫 메시지를 보내보세요! 🍽️</p>
            </div>
          )}
          
          {chat.map((chatItem, index) => {
            const isMine = isMyMessage(chatItem.user);
            const bubbleColor = isMine ? "bg-cyan-500" : getUserColor(chatItem.user);
            
            return (
              <div
                key={index}
                className={`flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${isMine ? "items-end" : "items-start"}`}>
                  {!isMine && (
                    <p className="text-xs text-gray-400 mb-1 ml-2">
                      {chatItem.user}
                    </p>
                  )}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-white ${bubbleColor} ${
                      isMine 
                        ? "rounded-br-sm" 
                        : "rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm break-words">{chatItem.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <div className="px-4 py-4 pb-8 bg-slate-900">
        <div className="flex items-center gap-3 max-w-[990px] mx-auto">
          <input
            type="text"
            value={sendMessage}
            onChange={sendMessageHandler}
            onKeyPress={enterKeyPress}
            className="flex-1 bg-slate-800 text-white rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-500 border border-slate-700"
            placeholder={connected ? "메시지를 입력하세요..." : "연결 중...🕐"}
            disabled={!connected}
          />
          <button
            onClick={submitSendMessage}
            disabled={!connected || !sendMessage}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

Chatting.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default Chatting;
