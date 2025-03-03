import { io, Socket } from "socket.io-client";

const testUrl = "http://localhost:3000";
const baseUrl = "https://ice-wss.up.railway.app/";

const chat: Socket<ChatS2C, ChatC2S> = io(baseUrl + "chat", { autoConnect: false });
const hive: Socket<ChatS2C, ChatC2S> = io(baseUrl + "hive", { autoConnect: false });

chat.onAny((event, ...args) => {
  console.log("chat events: " + event, ...args);
});

hive.onAny((event, ...args) => {
  console.log("hive events: " + event, ...args);
});

export default chat;

// Types
interface ChatS2C {
  user: (user: User) => void;
  pair: (rcptname: string) => void;
  unpair: () => void;
  private_message: (message: Message) => void;
}

interface ChatC2S {
  private_message: (content: string) => void;
  leave: () => void;
  delete: () => void;
}

export interface Message {
  self: boolean;
  content: string;
}

export interface User {
  id: string;
  name: string;
  messages: Message[];
  rcptName?: string;
}
