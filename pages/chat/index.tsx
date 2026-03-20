import Layout from "@/components/common/Layout";
import { ChatHeader, ChatMessageList, ChatInput } from "@/components/chat";
import { usePusherChat } from "@/hooks/usePusherChat";

const Chatting = () => {
  const { username, connected, userCount, messages, sendMessage } = usePusherChat();

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-1 flex flex-col w-full max-w-[990px] mx-auto">
        <ChatHeader
          username={username}
          connected={connected}
          userCount={userCount}
        />
        <ChatMessageList messages={messages} currentUser={username} />
      </div>
      <ChatInput connected={connected} onSend={sendMessage} />
    </div>
  );
};

Chatting.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
export default Chatting;
