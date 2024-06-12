import React, { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ConversationHeader,
  ChatContainer,
  MessageSeparator,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "./Comment.css";
import {
  joinRoom,
  sendMessage,
  receiveMessage,
  disconnectSocket,
} from "../services/messageService";
import {
  getMessageDirection,
  getUserId,
  getAnimalImageFromUUID,
} from "../services/uuidService";
import {
  convertToLocalTime,
  isNewDay,
  extractDatePart,
} from "../services/timeService";

const Comment = ({ roomCode, roomName }) => {
  const [userId, setUserId] = useState(""); // userId 설정
  const [messages, setMessages] = useState([]);

  const handleMessages = loadedMessages => {
    setMessages(loadedMessages);
  };

  const handleNewMessage = message => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    // 방에 참가
    joinRoom(roomCode, roomName, handleMessages)
      .then(messages => {
        console.log("Messages loaded:", messages);
      })
      .catch(error => {
        console.error("Error joining room:", error);
      });

    // 새로운 메시지를 수신할 때 처리
    receiveMessage(handleNewMessage);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      disconnectSocket();
    };
  }, [roomCode, roomName]);

  useEffect(() => {
    const storedUserId = getUserId();
    setUserId(storedUserId);
  }, []);

  const handleSend = messageText => {
    if (messageText) {
      sendMessage(roomCode, userId, messageText)
        .then(response => {
          console.log("Message sent:", response);
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName={roomName}
            />
          </ConversationHeader>
          <MessageList>
            {messages.map((msg, i) => (
              <React.Fragment key={i}>
                {i === 0 || isNewDay(msg.sendTime, messages[i - 1].sendTime) ? (
                  <MessageSeparator
                    content={extractDatePart(convertToLocalTime(msg.sendTime))}
                    className="custom-separator"
                  />
                ) : null}
                <Message
                  avatarPosition="tl"
                  model={{
                    message: msg.content,
                    sentTime: convertToLocalTime(msg.sendTime),
                    sender: msg.senderId,
                    direction: getMessageDirection(msg.senderId, userId),
                    position: "single",
                  }}>
                  <Avatar
                    size="md"
                    src={require(`../comment_assets/userImages/userLogo${getAnimalImageFromUUID(
                      msg.senderId
                    )}.jpg`)}
                  />
                  <Message.Footer sentTime={convertToLocalTime(msg.sendTime)} />
                </Message>
              </React.Fragment>
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Comment;
