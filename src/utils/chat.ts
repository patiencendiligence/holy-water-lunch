import { Feelings, Foods } from "@/constants";

const BUBBLE_COLORS = [
  "#2dd4bf", // teal-400
  "#fbbf24", // amber-400
  "#3b82f6", // blue-500
  "#fb7185", // rose-400
  "#c084fc", // purple-400
  "#34d399", // emerald-400
  "#fb923c", // orange-400
  "#f472b6", // pink-400
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
