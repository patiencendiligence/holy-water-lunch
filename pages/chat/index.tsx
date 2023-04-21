import { useState, useEffect, useCallback } from "react";
// * Socket.io
import SocketIOClient from "socket.io-client";

// let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type IMessage = {
  user: string;
  message: string;
};
const nameMaker = function () {
  const feelings = [
    "퇴근하고 싶은",
    "설레는",
    "즐거운",
    "졸린",
    "배고픈",
    "집에가고 싶은",
    "굶주린",
    "원기옥을 모으는",
    "떵마려운",
    "텅-장 주인",
    "플렉스",
    "노래부르는",
    "춤추는",
    "인생 최대의",
    "해맑은",
    "꿈꾸는",
  ];

  const foods = [
    "도나스🍩",
    "라면🍜",
    "새우튀김🍤",
    "크롸상🥐",
    "베이컨🥓",
    "쌀밥🍚",
    "국밥🍲",
    "팬케이크🥞",
    "파프리카🫑",
    "치즈🧀",
    "커퓌 ☕️",
    "피자🍕",
    "만두🥟",
    "초밥🍣",
    "통조림🥫",
    "스파게티🍝",
    "샐러드🥗",
    "초코레또🍫",
    "스파게티🍝",
    "김치찌개🍲",
    "된찌🥘",
    "우대갈비🍖",
    "스테이크🥩",
    "닭다리🍗",
    "사과🍎",
    "귤🍊",
    "딸기🍓",
    "아보카도🥑",
    "바나나🍌",
    "보리꼬리🥦",
    "옥수수🌽",
    "닭가슴살🐓",
    "햄버거🍔",
    "고구마🍠",
    "얼음🧊",
    "우유🍼",
    "맥주🍺",
    "와인🍷",
    "칵테일🍸",
    "위스키🥃",
    "칰힌🐔",
    "떡볶이🍢",
    "타코🌮",
    "케잌🍰",
    "김밥🍙",
  ];
  return `${feelings[Math.floor(Math.random() * feelings.length)]} ${
    foods[Math.floor(Math.random() * foods.length)]
  }`;
};

export default function Chatting() {
  const [username, setUsername] = useState("");
  const [sendMessage, setSendMessage] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [chat, setChat] = useState<IMessage[]>([]);

  useEffect((): any => {
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.NEXT_PUBLIC_API_URL, {
      path: "/api/chat/socketio",
    });

    setUsername(nameMaker());
    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMessage) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnect on component unmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessageHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSendMessage(event.target.value);
    },
    [sendMessage]
  );

  const enterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // send message
      event.preventDefault();
      submitSendMessage(event);
    }
  };

  const submitSendMessage = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (sendMessage && sendMessage !== "") {
      const message: IMessage = {
        user: username,
        message: sendMessage,
      };

      const response = await fetch("/api/chat", {
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
  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <p className="font-bold  text-xl">{username}님, 안녕하세요!👋</p>
        <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[38%] rounded-md shadow-md text-black ">
          <div className="h-full last:border-b-0 overflow-y-scroll">
            {chat.length ? (
              chat.map((chat, index) => (
                <div className="chat-message" key={index}>
                  {chat.user === username ? "me" : chat.user} : {chat.message}
                </div>
              ))
            ) : (
              <div className="alert-message"></div>
            )}
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
            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-200 transition-all">
              <button className=" px-3 h-full" onClick={submitSendMessage}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
