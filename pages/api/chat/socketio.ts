// import { Server, ServerOptions } from "socket.io";
// import messageHandler from "../../utils/sockets/messageHandler";

// export default function SocketHandler(
//   req: any,
//   res: {
//     socket: { server: Partial<ServerOptions> | any | undefined };
//     end: () => void;
//   }
// ) {
//   // It means that socket server was already initialised
//   if (res?.socket?.server?.io) {
//     console.log("Already set up");
//     res.end();
//     return;
//   }

//   const io = new Server(res.socket.server);
//   res.socket.server.io = io;

//   const onConnection = (socket: any) => {
//     messageHandler(io, socket);
//   };

//   // Define actions inside
//   io.on("connection", onConnection);

//   console.log("Setting up socket");
//   res.end();
// }
// import { Server, ServerOptions } from "socket.io";

// const ioHandler = (
//   req: any,
//   res: {
//     socket: { server: Partial<ServerOptions> | any | undefined };
//     end: () => void;
//   }
// ) => {
//   if (!res.socket.server.io) {
//     console.log("*First use, starting socket.io");

//     const io = new Server(res.socket.server);

//     io.on("connection", (socket) => {
//       socket.broadcast.emit("a user connected");
//       socket.on("hello", (msg) => {
//         socket.emit("hello", "world!");
//       });
//     });

//     res.socket.server.io = io;
//   } else {
//     console.log("socket.io already running");
//   }
//   res.end();
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default ioHandler;

import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/chat";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...✅");

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/chat/socketio",
    });

    res.socket.server.io = io;
  }

  res.end();
};
