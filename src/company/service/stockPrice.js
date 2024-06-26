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

