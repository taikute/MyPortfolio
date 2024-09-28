import { log, error } from "console";
import { randomUUID } from "crypto";
import { Server } from "socket.io";
import { clearInterval, setInterval } from "timers";

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(3000, {
  cors: {
    origin: "*",
  },
});

const users: UserMap = {};

function findRcpt(curId: string): string | undefined {
  if (!(curId in users)) {
    error("Find cancel: users not exists!");
    return undefined;
  }
  const userArr = Object.entries(users).filter(([id, data]) => curId != id && !data.rcptId && !data.deleteTimeout);
  if (userArr.length == 0) {
    log("Cant find any recipient!");
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * userArr.length);
  console.log("Found recipient: " + userArr[randomIndex][1].name);
  return userArr[randomIndex][0];
}

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

  const waitInterval = setInterval(() => {
    if (dataRef.rcptId) {
      if (dataRef.rcptId in users) {
        return;
      }
      io.to(curId).emit("unpair");
      return;
    }
    const rcptId = findRcpt(curId);
    if (!rcptId) {
      return;
    }
    pair(rcptId);
  }, 3000);

  socket.on("private_message", (content) => {
    if (dataRef.rcptId) {
      io.to(curId).emit("private_message", { self: true, content });
      io.to(dataRef.rcptId).emit("private_message", { self: false, content });
      dataRef.messages.unshift({ self: true, content });
      users[dataRef.rcptId].messages.unshift({ self: false, content });
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
      users[dataRef.rcptId].rcptId = undefined;
      users[dataRef.rcptId].messages = [];
    }
    delete users[curId];
    socket.disconnect(true);
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
    clearInterval(waitInterval);
  });

  function pair(rcptId: string) {
    if (rcptId in users) {
      users[curId].rcptId = rcptId;
      users[rcptId].rcptId = curId;
      io.to(curId).emit("pair", users[rcptId].name);
      io.to(rcptId).emit("pair", users[curId].name);
      log("Paired: " + users[rcptId].name + " with " + users[curId].name);
    } else {
      error("Pair cancel!");
    }
  }

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
