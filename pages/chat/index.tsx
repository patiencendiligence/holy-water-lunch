import Layout from "@/components/common/Layout";
import { Feelings, Foods } from "@/constants";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const [username, setUsername] = useState("");
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(nameMaker());

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("chat");
    
    pusher.connection.bind("connected", () => {
      console.log("Pusher connected!");
      setConnected(true);
    });

    channel.bind("message", (message: IMessage) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
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
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <p className="font-bold text-lg text-white">
          {username}님 👋
        </p>
        <p className="text-xs text-gray-400">
          {connected ? "🟢 연결됨" : "🔴 연결 중..."}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
        {chat.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            아직 메시지가 없어요.<br />첫 메시지를 보내보세요! 🍽️
          </div>
        )}
        
        {chat.map((chatItem, index) => {
          const isMine = isMyMessage(chatItem.user);
          const bubbleColor = isMine ? "bg-blue-500" : getUserColor(chatItem.user);
          
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

      {/* Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <input
            type="text"
            value={sendMessage}
            onChange={sendMessageHandler}
            onKeyPress={enterKeyPress}
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder={connected ? "메시지를 입력하세요..." : "연결 중...🕐"}
            disabled={!connected}
          />
          <button
            onClick={submitSendMessage}
            disabled={!connected || !sendMessage}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
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
