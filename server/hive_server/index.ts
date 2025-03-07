import { log, error } from "console";
import { randomUUID } from "crypto";
import { Server } from "socket.io";
import { setInterval } from "timers";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

log("Host https://hive-socket.up.railway.app/");
