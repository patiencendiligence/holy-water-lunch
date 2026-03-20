import { Feelings, Foods } from "@/constants";

const BUBBLE_COLORS = [
  "bg-teal-400",
  "bg-amber-400",
  "bg-blue-500",
  "bg-rose-400",
  "bg-purple-400",
  "bg-emerald-400",
  "bg-orange-400",
  "bg-pink-400",
];

export const generateUsername = (): string => {
  const feeling = Feelings[Math.floor(Math.random() * Feelings.length)];
  const food = Foods[Math.floor(Math.random() * Foods.length)];
  return `${feeling} ${food}`;
};

export const getUserBubbleColor = (username: string): string => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BUBBLE_COLORS[Math.abs(hash) % BUBBLE_COLORS.length];
};
