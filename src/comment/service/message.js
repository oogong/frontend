import { io } from "socket.io-client";

// 서버 URL을 환경 변수에서 가져오거나 기본값으로 설정합니다.
const CHAT_APP_SOCKET_URL =
  process.env.REACT_APP_LOCAL_API_URL || "http://localhost:5000";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    console.log(`Connecting to ${CHAT_APP_SOCKET_URL}/chat`);
    socket = io(CHAT_APP_SOCKET_URL, {
      path: "/chat",
    });

    // socket.on("connection", () => {
    //   console.log("Connected to the server");
    // });
  }
  return socket;
};

export const joinRoom = (roomCode, roomName, handleMessages) => {
  return new Promise((resolve, reject) => {
    console.log(
      `Joining room with roomCode: ${roomCode}, roomName: ${roomName}`
    );
    console.log("joinRoom Service 로직 실행됐어요");
    socket.emit("join room", { roomCode, roomName });

    socket.on("load messages", messages => {
      handleMessages(messages);
      console.log("load messages");
      resolve(messages);
    });

    socket.on("error", error => {
      console.error("Error joining room:", error);
      reject(error);
    });
  });
};

export const sendMessage = (roomCode, senderId, content) => {
  return new Promise((resolve, reject) => {
    console.log(
      `Sending message to roomCode: ${roomCode}, senderId: ${senderId}, content: ${content}`
    );
    socket.emit("send message", { roomCode, senderId, content });

    socket.on("message sent", response => {
      if (response.status === "success") {
        console.log("Message sent successfully");
        resolve(response);
      } else {
        reject(new Error("Message not sent"));
      }
    });

    socket.on("error", error => {
      console.error("Error sending message:", error);
      reject(error);
    });
  });
};

export const receiveMessage = handleNewMessage => {
  socket.on("receive message", message => {
    console.log("Received new message", message);
    handleNewMessage(message);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket");
    socket.disconnect();
    socket = null;
  }
};
