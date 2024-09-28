import { io, Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
  // "https://ice-wss.glitch.me/",
  { autoConnect: false }
);

socket.onAny((event, ...args) => {
  console.log(event, ...args);
});

export default socket;

// Types
interface ServerToClientEvents {
  user: (user: User) => void;
  pair: (rcptname: string) => void;
  unpair: () => void;
  private_message: (message: Message) => void;
}

interface ClientToServerEvents {
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
