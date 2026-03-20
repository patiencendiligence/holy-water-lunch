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

const Chatting = () => {
  const [username, setUsername] = useState("");
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);
  const messagesEndRef = useRef<HTMLInputElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  };

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
      scrollToBottom();
    }
  };

  return (
    <div className="w-full h-full min-h-screen justify-center px-4">
      <p className="font-bold text-xl text-white pt-6 pb-2">
        {username}님,
        <br />
        안녕하세요!👋
      </p>
      <div className="flex flex-col justify-end bg-white h-[25rem] min-w-[45%] rounded-md shadow-md text-black ">
        <div className="h-full last:border-b-0 overflow-y-scroll">
          {chat.length ? (
            chat.map((chatItem, index) => (
              <div className="chat-message p-2 border-b border-gray-100" key={index}>
                <span className="font-semibold text-purple-600">
                  {chatItem.user === username ? "나" : chatItem.user}
                </span>
                : {chatItem.message}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-400 text-center">
              아직 메시지가 없어요. 첫 메시지를 보내보세요! 🍽️
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="border-t border-gray-300 w-full flex rounded-bl-md">
          <input
            type="text"
            value={sendMessage}
            onChange={sendMessageHandler}
            className="outline-none py-2 px-2 rounded-bl-md flex-1"
            onKeyPress={enterKeyPress}
            placeholder={
              connected ? "배고픈자들의 대화를 시작해보세요." : "연결 중...🕐"
            }
          />
          <div className="border-l border-gray-300 flex justify-center items-center rounded-br-md group hover:bg-purple-200 transition-all">
            <button className="px-3 h-full" onClick={submitSendMessage}>
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Chatting.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default Chatting;
