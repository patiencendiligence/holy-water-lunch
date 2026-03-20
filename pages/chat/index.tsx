import { ChatHeader, ChatMessageList, ChatInput } from "@/components/chat";
import { usePusherChat } from "@/hooks/usePusherChat";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Chatting = () => {
  const router = useRouter();
  const { username, connected, userCount, messages, sendMessage } = usePusherChat();

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <Head>
        <title>Chat | HolyWaterLunch</title>
      </Head>
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div 
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "990px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          <ChatHeader
            username={username}
            connected={connected}
            userCount={userCount}
            onBack={() => router.back()}
          />
          <ChatMessageList messages={messages} currentUser={username} />
        </div>
        <ChatInput connected={connected} onSend={sendMessage} />
      </div>
    </>
  );
};

export default Chatting;
