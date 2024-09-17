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
  data: (userState: [string, boolean][], messageList: Message[]) => void;
  user_connected: (id: string) => void;
  user_disconnected: (id: string) => void;
}

interface ClientToServerEvents {
  private_message: (recipientId: string, content: string) => void;
}

export class Message {
  senderId: string;
  recipientId: string;
  content: string;

  constructor(senderId: string, recipientId: string, content: string) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.content = content;
  }
}
