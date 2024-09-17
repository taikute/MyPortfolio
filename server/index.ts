import { Server } from "socket.io";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(3000, {
  cors: {
    origin: ["http://localhost:5173", "https://nguyenanhtai.netlify.app/"],
  },
});

const userState = new Map<string, boolean>();
const messageList: Message[] = [];

// Middlewares
io.use((socket, next) => {
  const storageId: string = socket.handshake.auth.storageId;
  if (storageId) {
    socket.data.userId = storageId;
    return next();
  }
  const userId: string = socket.handshake.auth.userId;
  if (!userId || userState.has(userId)) {
    return next(new Error("Invalid username!"));
  }
  socket.data.userId = userId;
  next();
});

io.on("connection", (socket) => {
  const id = socket.data.userId;
  console.log(`${id} is connected! (Total: ${io.of("/").sockets.size})`);

  userState.set(id, true);

  socket.join(id);

  const filteredMessages = messageList.filter(
    (message) => message.senderId == id || message.recipientId == id
  );

  socket.emit("data", Array.from(userState), filteredMessages);

  socket.broadcast.emit("user_connected", id);

  socket.on("private_message", (recipientId, content) => {
    const message = new Message(id, recipientId, content);
    socket.to(id).to(recipientId).emit("private_message", message);
    messageList.push(message);
  });

  socket.on("disconnect", (reason) => {
    console.log(`${id} is disconnected, reason: ${reason}`);
    socket.broadcast.emit("user_disconnected", id);
    userState.set(id, false);
  });
});

console.log("On http://localhost:3000");

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

class Message {
  senderId: string;
  recipientId: string;
  content: string;

  constructor(senderId: string, recipientId: string, content: string) {
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.content = content;
  }
}

interface InterServerEvents {}

interface SocketData {
  userId: string;
}
