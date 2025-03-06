import { io, Socket } from "socket.io-client";

const testUrl = "http://localhost:3000/";
const baseUrl = "https://chat-socket.up.railway.app/";

const socket: Socket<S2CE, C2SE> = io(baseUrl, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log("chat: " + event, ...args);
});

export default socket;

// Types
interface S2CE {
  user: (user: User) => void;
  pair: (rcptname: string) => void;
  unpair: () => void;
  private_message: (message: Message) => void;
}

interface C2SE {
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
