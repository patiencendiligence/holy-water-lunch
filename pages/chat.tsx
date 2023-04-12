import SocketIOClient from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import socket from "./api/socket";

type IMessage = {
  author: string;
  msg: string;
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
export default function Chat() {
  const [username, setUsername] = useState("");
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMessage[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    setUsername(nameMaker());
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });

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

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMessage = {
        author: username,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <p className="font-bold  text-xl">{username}님, 안녕하세요!👋</p>
        <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md text-black ">
          <div className="h-full last:border-b-0 overflow-y-scroll">
            {chat.map((m, i) => {
              return (
                <div
                  className="w-full py-1 px-2 border-b border-gray-200"
                  key={i}
                >
                  {m.author} : {m.msg}
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-300 w-full flex rounded-bl-md">
            <input
              ref={inputRef}
              type="text"
              value={msg}
              placeholder={connected ? "입력해주세요..." : "연결 중..."}
              className="w-full h-full rounded shadow border-gray-400 border px-2"
              disabled={!connected}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-200 transition-all">
              <button
                className=" px-3 h-full"
                onClick={sendMessage}
                disabled={!connected}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
