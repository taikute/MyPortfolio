"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var console_1 = require("console");
var crypto_1 = require("crypto");
var socket_io_1 = require("socket.io");
var timers_1 = require("timers");
var io = new socket_io_1.Server(3000, {
    cors: {
        origin: "*",
    },
});
var users = {};
function suffle(arr) {
    var _a;
    var curIndex = arr.length;
    while (curIndex != 0) {
        var randomIndex = Math.floor(Math.random() * curIndex);
        curIndex--;
        _a = [arr[randomIndex], arr[curIndex]], arr[curIndex] = _a[0], arr[randomIndex] = _a[1];
    }
}
(0, timers_1.setInterval)(function () {
    var _a, _b;
    var userArr = Object.entries(users).filter(function (_a) {
        var id = _a[0], data = _a[1];
        return !data.rcptId && !data.deleteTimeout;
    });
    if (userArr.length < 2) {
        return;
    }
    suffle(userArr);
    if (userArr.length % 2 == 1) {
        userArr.pop();
    }
    while (userArr.length > 0) {
        var id1 = (_a = userArr.pop()) === null || _a === void 0 ? void 0 : _a[0];
        var id2 = (_b = userArr.pop()) === null || _b === void 0 ? void 0 : _b[0];
        if (!id1 || !id2 || !(id1 in users) || !(id2 in users)) {
            (0, console_1.log)("Pair fail!");
            return;
        }
        users[id1].rcptId = id2;
        users[id2].rcptId = id1;
        io.to(id1).emit("pair", users[id2].name);
        io.to(id2).emit("pair", users[id1].name);
        (0, console_1.log)("Paired: " + users[id1].name + " with " + users[id2].name);
    }
}, 3000);
// Middlewares
io.use(function (socket, next) {
    var id = socket.handshake.auth.id;
    if (id) {
        if (id in users) {
            socket.data.id = id;
            socket.data.name = users[id].name;
            (0, console_1.log)("Id auth: " + id);
            return next();
        }
        return next(new Error("Id was deleted!"));
    }
    var name = socket.handshake.auth.name;
    if (!name) {
        return next(new Error("Invalid username!"));
    }
    socket.data.id = (0, crypto_1.randomUUID)();
    socket.data.name = name;
    (0, console_1.log)("Name auth: " + name);
    next();
});
io.on("connection", function (socket) {
    var curId = socket.data.id;
    socket.join(curId);
    var curName = socket.data.name;
    console.log("".concat(curName, " is connected! (Total: ").concat(io.of("/").sockets.size, ")"));
    // Create or restore data
    if (curId in users) {
        var deleteTimeout = users[curId].deleteTimeout;
        if (deleteTimeout) {
            clearTimeout(deleteTimeout);
            if (users[curId].deleteTimeout) {
                users[curId].deleteTimeout = undefined;
            }
        }
    }
    else {
        users[curId] = { name: curName, messages: [] };
    }
    // Emit data
    var dataRef = users[curId];
    {
        var rcptName = void 0;
        if (dataRef.rcptId && dataRef.rcptId in users) {
            rcptName = users[dataRef.rcptId].name;
        }
        io.to(curId).emit("user", { id: curId, name: curName, rcptName: rcptName, messages: dataRef.messages });
    }
    socket.on("private_message", function (content) {
        if (dataRef.rcptId) {
            if (dataRef.rcptId in users) {
                io.to(dataRef.rcptId).emit("private_message", { self: false, content: content });
                users[dataRef.rcptId].messages.unshift({ self: false, content: content });
            }
            io.to(curId).emit("private_message", { self: true, content: content });
            dataRef.messages.unshift({ self: true, content: content });
        }
        else {
            (0, console_1.error)("Send failed: no recipient id!");
        }
    });
    socket.on("leave", function () {
        if (dataRef.rcptId) {
            unpair(dataRef.rcptId);
        }
    });
    socket.on("delete", function () {
        if (dataRef.rcptId) {
            io.to(dataRef.rcptId).emit("unpair");
            if (dataRef.rcptId in users) {
                users[dataRef.rcptId].rcptId = undefined;
                users[dataRef.rcptId].messages = [];
            }
        }
        socket.disconnect(true);
        delete users[curId];
        (0, console_1.log)("User with id: " + curId + " was deleted!");
    });
    socket.on("disconnect", function (reason) {
        if (curId in users) {
            (0, console_1.log)("".concat(users[curId].name, " is disconnected, reason: ").concat(reason));
            (0, console_1.log)("Delete ".concat(curId, " after 10s!"));
            try {
                users[curId].deleteTimeout = setTimeout(function () {
                    delete users[curId];
                    (0, console_1.log)("User id ".concat(curId, " was deleted!"));
                }, 10000);
            }
            catch (err) {
                delete users[curId];
                (0, console_1.log)("User id ".concat(curId, " was deleted with error!"));
            }
        }
    });
    function unpair(rcptId) {
        if (rcptId in users) {
            users[curId].rcptId = undefined;
            users[rcptId].rcptId = undefined;
            users[curId].messages = [];
            users[rcptId].messages = [];
            io.to(curId).to(rcptId).emit("unpair");
            (0, console_1.log)("Unpaired: " + users[rcptId].name + " with " + users[curId].name);
        }
        else {
            (0, console_1.error)("Unpair cancel!");
        }
    }
});
(0, console_1.log)("On http://localhost:3000");
(0, console_1.log)("On https://ice-wss.glitch.me/");
