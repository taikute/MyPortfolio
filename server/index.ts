import { log, error } from "console";
import { randomUUID } from "crypto";
import { Server } from "socket.io";
import { setInterval } from "timers";

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, {
  cors: {
    origin: "*",
  },
});

const users: UserMap = {};

function suffle(arr: any[]) {
  let curIndex = arr.length;
  while (curIndex != 0) {
    let randomIndex = Math.floor(Math.random() * curIndex);
    curIndex--;

    [arr[curIndex], arr[randomIndex]] = [arr[randomIndex], arr[curIndex]];
  }
}

setInterval(() => {
  const userArr = Object.entries(users).filter(([id, data]) => !data.rcptId && !data.deleteTimeout);
  if (userArr.length < 2) {
    return;
  }
  suffle(userArr);
  if (userArr.length % 2 == 1) {
    userArr.pop();
  }
  while (userArr.length > 0) {
    const id1 = userArr.pop()?.[0];
    const id2 = userArr.pop()?.[0];
    if (!id1 || !id2 || !(id1 in users) || !(id2 in users)) {
      log("Pair fail!");
      return;
    }
    users[id1].rcptId = id2;
    users[id2].rcptId = id1;
    io.to(id1).emit("pair", users[id2].name);
    io.to(id2).emit("pair", users[id1].name);
    log("Paired: " + users[id1].name + " with " + users[id2].name);
  }
}, 3000);

// Middlewares
io.use((socket, next) => {
  const id: string | undefined = socket.handshake.auth.id;
  if (id) {
    if (id in users) {
      socket.data.id = id;
      socket.data.name = users[id].name;
      log("Id auth: " + id);
      return next();
    }
    return next(new Error("Id was deleted!"));
  }
  const name: string | undefined = socket.handshake.auth.name;
  if (!name) {
    return next(new Error("Invalid username!"));
  }
  socket.data.id = randomUUID();
  socket.data.name = name;
  log("Name auth: " + name);
  next();
});

io.on("connection", (socket) => {
  const curId = socket.data.id;
  socket.join(curId);
  const curName = socket.data.name;
  console.log(`${curName} is connected! (Total: ${io.of("/").sockets.size})`);

  // Create or restore data
  if (curId in users) {
    const deleteTimeout = users[curId].deleteTimeout;
    if (deleteTimeout) {
      clearTimeout(deleteTimeout);
      if (users[curId].deleteTimeout) {
        users[curId].deleteTimeout = undefined;
      }
    }
  } else {
    users[curId] = { name: curName, messages: [] };
  }

  // Emit data
  const dataRef = users[curId];
  {
    let rcptName: string | undefined;
    if (dataRef.rcptId && dataRef.rcptId in users) {
      rcptName = users[dataRef.rcptId].name;
    }
    io.to(curId).emit("user", { id: curId, name: curName, rcptName, messages: dataRef.messages });
  }

  socket.on("private_message", (content) => {
    if (dataRef.rcptId) {
      if (dataRef.rcptId in users) {
        io.to(dataRef.rcptId).emit("private_message", { self: false, content });
        users[dataRef.rcptId].messages.unshift({ self: false, content });
      }
      io.to(curId).emit("private_message", { self: true, content });
      dataRef.messages.unshift({ self: true, content });
    } else {
      error("Send failed: no recipient id!");
    }
  });

  socket.on("leave", () => {
    if (dataRef.rcptId) {
      unpair(dataRef.rcptId);
    }
  });

  socket.on("delete", () => {
    if (dataRef.rcptId) {
      io.to(dataRef.rcptId).emit("unpair");
      if (dataRef.rcptId in users) {
        users[dataRef.rcptId].rcptId = undefined;
        users[dataRef.rcptId].messages = [];
      }
    }
    socket.disconnect(true);
    delete users[curId];
    log("User with id: " + curId + " was deleted!");
  });

  socket.on("disconnect", (reason) => {
    if (curId in users) {
      log(`${users[curId].name} is disconnected, reason: ${reason}`);
      log(`Delete ${curId} after 10s!`);
      try {
        users[curId].deleteTimeout = setTimeout(() => {
          delete users[curId];
          log(`User id ${curId} was deleted!`);
        }, 10000);
      } catch (err) {
        delete users[curId];
        log(`User id ${curId} was deleted with error!`);
      }
    }
  });

  function unpair(rcptId: string) {
    if (rcptId in users) {
      users[curId].rcptId = undefined;
      users[rcptId].rcptId = undefined;
      users[curId].messages = [];
      users[rcptId].messages = [];
      io.to(curId).to(rcptId).emit("unpair");
      log("Unpaired: " + users[rcptId].name + " with " + users[curId].name);
    } else {
      error("Unpair cancel!");
    }
  }
});

log("On http://localhost:3000");
log("On https://ice-wss.glitch.me/");

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

interface Message {
  self: boolean;
  content: string;
}

interface User {
  id: string;
  name: string;
  messages: Message[];
  rcptName?: string;
}

interface InterServerEvents {}

interface SocketData {
  id: string;
  name: string;
}

interface UserMap {
  [id: string]: {
    name: string;
    deleteTimeout?: NodeJS.Timeout;
    rcptId?: string;
    messages: Message[];
  };
}
