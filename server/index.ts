import { Server, Socket } from "socket.io";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Middlewares
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username!"));
  }
  socket.data.username = username;
  next();
});

io.on("connection", (socket) => {
  console.log(
    `${socket.data.username} is connected! (Total: ${io.of("/").sockets.size})`
  );

  

  socket.on("private_message", (content, recipientId) => {
    console.log(
      `Message from ${socket.data.username} to ${recipientId}: ${content}`
    );

  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.data.username} is disconnected, reason: ${reason}`);
  });
});

console.log("On http://localhost:3000");

// Types
interface ServerToClientEvents {
  private_message: (content: string, senderId: string) => void;
}

interface ClientToServerEvents {
  private_message: (content: string, recipientId: string) => void;
}

interface InterServerEvents {}

interface SocketData {
  username: string;
}
