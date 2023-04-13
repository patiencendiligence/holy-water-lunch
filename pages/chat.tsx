// import io, { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useState, useEffect, use } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

// let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

type Message = {
  author: string;
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

// export default function Chat() {
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Array<Message>>([]);

//   useEffect(() => {
//     socket = io();
//     socket.emit("newUserConnect", username);
//   }, [username]);
//   useEffect(() => {
//     setUsername(nameMaker());
//     socketInitializer();
//   }, []);

//   const socketInitializer = async () => {
//     // We just call it because we don't need anything else out of it
//     await fetch("/api/socket");

//     socket = io();

//     socket.on("newIncomingMessage", (msg) => {
//       setMessages((currentMsg) => [
//         ...currentMsg,
//         { author: msg.author, message: msg.message },
//       ]);
//       console.log(messages);
//     });
//   };

//   const sendMessage = async () => {
//     socket.emit("createdMessage", { author: username, message });
//     setMessages((currentMsg) => [...currentMsg, { author: username, message }]);
//     setMessage("");
//   };

//   const handleKeypress = (e: { keyCode: number }) => {
//     //it triggers by pressing the enter key
//     console.log(e.keyCode === 13, "ENTER!");
//     if (e.keyCode === 13) {
//       if (message && message !== "") {
//         sendMessage();
//       }
//     }
//   };

//   return (
//     <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
//       <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
//         <p className="font-bold  text-xl">{username}님, 안녕하세요!👋</p>
//         <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md text-black ">
//           <div className="h-full last:border-b-0 overflow-y-scroll">
//             {messages.map((msg, i) => {
//               return (
//                 <div
//                   className="w-full py-1 px-2 border-b border-gray-200"
//                   key={i}
//                 >
//                   {msg.author} : {msg.message}
//                 </div>
//               );
//             })}
//           </div>
//           <div className="border-t border-gray-300 w-full flex rounded-bl-md">
//             <input
//               type="text"
//               placeholder="냠냠..."
//               value={message}
//               className="outline-none py-2 px-2 rounded-bl-md flex-1"
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyUp={handleKeypress}
//             />
//             <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-200 transition-all">
//               <button
//                 className=" px-3 h-full"
//                 onClick={() => {
//                   sendMessage();
//                 }}
//               >
//                 SEND
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Chat() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      const socket = io();
      socket.on("connect", () => {
        console.log("connect");
        setUsername(nameMaker());
        socket.emit("hello");
      });
      socket.emit("createdMessage", { author: username, message });
      socket.on("hello", (data) => {
        console.log("hello", data);
        socket.emit("newUserConnect", username);
      });

      socket.on("a user connected", () => {
        console.log("a user connected");
      });
      socket.on("disconnect", () => {
        console.log("disconnect");
      });

      socket.on("newIncomingMessage", () => {
        console.log("disconnect");
      });
    });
  }, []); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const sendMessage = async () => {
    setMessages((currentMsg) => [...currentMsg, { author: username, message }]);
    setMessage("");
  };

  const handleKeypress = (e: { keyCode: number }) => {
    //it triggers by pressing the enter key
    console.log(e.keyCode === 13, "ENTER!");
    if (e.keyCode === 13) {
      if (message && message !== "") {
        sendMessage();
      }
    }
  };
  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <p className="font-bold  text-xl">{username}님, 안녕하세요!👋</p>
        <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md text-black ">
          <div className="h-full last:border-b-0 overflow-y-scroll">
            {messages.map((msg, i) => {
              return (
                <div
                  className="w-full py-1 px-2 border-b border-gray-200"
                  key={i}
                >
                  {msg.author} : {msg.message}
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-300 w-full flex rounded-bl-md">
            <input
              type="text"
              placeholder="냠냠..."
              value={message}
              className="outline-none py-2 px-2 rounded-bl-md flex-1"
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeypress}
            />
            <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-200 transition-all">
              <button
                className=" px-3 h-full"
                onClick={() => {
                  sendMessage();
                }}
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
