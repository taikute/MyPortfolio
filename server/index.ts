import { time, timeStamp } from "console";
import { Server } from "socket.io";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(3000, {
  cors: {
    origin: "*",
  },
});

// const userState = new Map<string, boolean>();
// const messageList: Message[] = [];
const users: UserMap = {};
const messages: Message[] = [];

// Middlewares
io.use((socket, next) => {
  const storageId: string = socket.handshake.auth.storageId;
  if (storageId) {
    socket.data.userId = storageId;
    return next();
  }
  const userId: string = socket.handshake.auth.userId;
  if (!userId || userId in users) {
    return next(new Error("Invalid username!"));
  }
  socket.data.userId = userId;
  next();
});

io.on("connection", (socket) => {
  const userId = socket.data.userId;
  console.log(`${userId} is connected! (Total: ${io.of("/").sockets.size})`);

  users[userId] = { connected: true, lastConnected: undefined };

  socket.join(userId);

  const filteredMessages = messages.filter(
    (message) => message.senderId == userId || message.recipientId == userId
  );

  socket.emit("data", users, filteredMessages);

  socket.broadcast.emit("user_connected", userId);

  socket.on("private_message", (recipientId, content) => {
    const message = new Message(userId, recipientId, content);
    socket.to(userId).to(recipientId).emit("private_message", message);
    messages.unshift(message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`${userId} is disconnected, reason: ${reason}`);
    socket.broadcast.emit("user_disconnected", userId);
    users[userId] = {
      connected: false,
      lastConnected: Date.now(),
    };
  });
});

console.log("On http://localhost:3000");
console.log("On https://ice-wss.glitch.me/");

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

interface InterServerEvents {}

interface SocketData {
  userId: string;
}

interface UserMap {
  [id: string]: {
    connected: boolean;
    lastConnected?: number;
  };
}

class Message {
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
