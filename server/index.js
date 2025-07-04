const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { clearLine } = require("readline");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // Frontend origin
    methods: ["GET", "POST"],
  },
});
app.use(router);

//---------------------deployment-----------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  //  Serve index.html for all unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is up and running");
  });
}

//---------------------deployment-----------------------

//Translation function
const translateMessage = async (text, targetLang) => {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const response = await axios.get(url);
    return response.data[0][0][0]; // Extract translated text
  } catch (error) {
    console.error("Translation Error:", error.message);
    return text; // Fallback to original text if translation fails
  }
};

//Socket Connection
io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on("join", async ({ name, room, language }, callback) => {
    //This is an event listener of emitted event from client side

    //socket.language = language;

    const { error, user } = addUser({ id: socket.id, name, room, language });
    const roomUsers = getUsersInRoom(user.room);
    console.log("UsersInRoom:", roomUsers);

    if (error) return callback(error);

    //When user has been joined this message will come up
    socket.emit("message", {
      user: "admin",
      text: await translateMessage(
        `${user.name}, welcome to the Forum!`,
        "en"
      ),
    });

    // 🔹 Loop through each user in the room to send translated message
    roomUsers.forEach(async (u) => {
      const translatedText = await translateMessage(
        `${user.name} has joined!`,
        u.language || "en"
      );

      io.to(u.id).emit("message", {
        user: "admin",
        text: translatedText,
      });
    });

    //If not an error

    socket.join(user.room); //Now user is inside the room

    callback(); //If there are no errors
  });

  //Events for user generated messages
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      console.error(`User not found for socket ID: ${socket.id}`);
      return callback({ error: "User not found" });
    }
    const usersInRoom = getUsersInRoom(user.room);
    if (!message || typeof message !== "string") {
      return callback({ error: "Invalid message format" });
    }
    //io.to(user.room).emit('message',{user:user.name , text:message});
    usersInRoom.forEach(async (u) => {
      const translatedText = await translateMessage("en");

      io.to(u.id).emit("message", {
        user: user.name,
        text: translatedText,
      });
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
    if (user) {
      const usersInRoom = getUsersInRoom(user.room);
      usersInRoom.forEach(async (u) => {
        const translatedText = await translateMessage(
          `${user.name} has left!!`,
          u.language || "en"
        );

        io.to(u.id).emit("message", {
          user: "admin",
          text: translatedText,
        });
      });
      //io.to(user.room).emit('message',{user:"admin",text:});
    }
    console.log("User has left");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on the port ${PORT}`);
});
