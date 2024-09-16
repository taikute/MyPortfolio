import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  private_message: (content: string, senderId: string) => void;
}

interface ClientToServerEvents {
  private_message: (content: string, recipientId: string) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
  { autoConnect: false }
);

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
