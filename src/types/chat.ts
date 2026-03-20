export interface IMessage {
  user: string;
  message: string;
}

export interface ChatState {
  username: string;
  connected: boolean;
  userCount: number;
  messages: IMessage[];
}
