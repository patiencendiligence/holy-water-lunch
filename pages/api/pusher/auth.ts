import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { socket_id, channel_name, username } = req.body;

  const presenceData = {
    user_id: socket_id,
    user_info: {
      name: username || "익명",
    },
  };

  const authResponse = pusher.authorizeChannel(socket_id, channel_name, presenceData);
  res.status(200).json(authResponse);
}
