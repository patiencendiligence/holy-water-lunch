import { Server, ServerOptions } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(
  req: any,
  res: {
    socket: { server: Partial<ServerOptions> | any | undefined };
    end: () => void;
  }
) {
  // It means that socket server was already initialised
  if (res?.socket?.server?.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on("connection", function (socket: any) {
    messageHandler(io, socket);
    socket.on("newUserConnect", function (name: any) {
      socket.name = name;

      socket.broadcast.emit("updateMessage", {
        name: "SERVER",
        message: name + "님이 접속했습니다.",
      });
    });

    socket.on("disconnect", function () {
      socket.broadcast.emit("updateMessage", {
        name: "SERVER",
        message: socket.name + "님이 퇴장했습니다.",
      });
    });
  });

  console.log("Setting up socket");
  res.end();
}
