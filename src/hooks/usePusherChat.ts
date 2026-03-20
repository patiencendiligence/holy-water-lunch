import { useState, useEffect, useCallback } from "react";
import Pusher from "pusher-js";
import { IMessage } from "@/types/chat";
import { generateUsername } from "@/utils/chat";

export const usePusherChat = () => {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const name = generateUsername();
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
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      presenceChannel.unbind_all();
      presenceChannel.unsubscribe();
      chatChannel.unbind_all();
      chatChannel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const message: IMessage = {
        user: username,
        message: text,
      };

      await fetch("/api/chat", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    },
    [username]
  );

  return {
    username,
    connected,
    userCount,
    messages,
    sendMessage,
  };
};
