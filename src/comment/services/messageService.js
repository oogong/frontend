import { io } from "socket.io-client";

// 서버 URL을 환경 변수에서 가져오거나 기본값으로 설정합니다.
const CHAT_APP_SOCKET_URL =
  process.env.REACT_APP_CHAT_SOCKET_URL || "http://localhost:5000";
console.log(`Connecting to ${CHAT_APP_SOCKET_URL}/chat`);
const socket = io(CHAT_APP_SOCKET_URL, {
  path: "/chat",
  //   withCredentials: true,
  //   extraHeaders: {
  //     "my-custom-header": "abcd",
  //   },
});
socket.on("connection", () => {
  console.log("Connected to the server");
});

export const joinRoom = (roomCode, roomName, handleMessages) => {
  return new Promise((resolve, reject) => {
    console.log(
      `Joining room with roomCode: ${roomCode}, roomName: ${roomName}`
    );
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
  console.log("Disconnecting socket");
  socket.disconnect();
};
