import { io } from "socket.io-client";

const CHAT_APP_SOCKET_URL =
  process.env.REACT_APP_LOCAL_API_URL || "http://localhost:5000";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    console.log(`Connecting to ${CHAT_APP_SOCKET_URL}/price`);
    socket = io(CHAT_APP_SOCKET_URL, {
      path: "/price",
    });
  } else {
    console.log("Socket already connected");
  }
  return socket;
};

export const joinRoom = (roomCode, handlePrice, handleCompare) => {
  return new Promise((resolve, reject) => {
    console.log(`Joining price room with roomCode: ${roomCode}`);
    socket.emit("join price room", { roomCode });

    socket.on("load price", (price) => {
      if (!price) {
        handlePrice(0);
        handleCompare(0);
      } else {
        handlePrice(price.price);
        handleCompare(price.compare);
        console.log("load price", price.price);
      }
      resolve(price);
    });

    socket.on("error", (error) => {
      console.error("Error joining price room:", error);
      reject(error);
    });
  });
};
