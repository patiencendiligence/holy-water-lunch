import { ChatHeader, ChatMessageList, ChatInput } from "@/components/chat";
import { usePusherChat } from "@/hooks/usePusherChat";
import Seo from "@/components/common/Seo";
import { useRouter } from "next/router";

const Chatting = () => {
  const router = useRouter();
  const { username, connected, userCount, messages, sendMessage } = usePusherChat();

  return (
    <div className="flex flex-col h-screen w-full bg-black">
      <Seo title="Chat" />
      <div className="flex-1 flex flex-col w-full max-w-[990px] mx-auto overflow-hidden">
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
  );
};

export default Chatting;
