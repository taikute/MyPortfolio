import { io, Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  // "http://localhost:3000",
  "https://ice-wss.glitch.me/",
  { autoConnect: false }
);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

// Types
interface ServerToClientEvents {
  private_message: (message: Message) => void;
  data: (users: UserMap, messages: Message[]) => void;
  user_connected: (id: string) => void;
  user_disconnected: (id: string) => void;
}

interface ClientToServerEvents {
  private_message: (recipientId: string, content: string) => void;
}

export interface UserMap {
  [id: string]: {
    connected: boolean;
    lastConnected?: number;
  };
}

export class Message {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: number;
  isRead: boolean;

  constructor(senderId: string, recipientId: string, content: string) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.content = content;
    this.timestamp = Date.now();
    this.isRead = false;
  }
}
