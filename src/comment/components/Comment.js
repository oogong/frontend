import React from "react";
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

export default function Comment() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              name="Emily"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Samsung_Electronics_logo_%28hangul%29.svg/604px-Samsung_Electronics_logo_%28hangul%29.svg.png"
            />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName="삼성전자"
            />
          </ConversationHeader>
          <MessageList>
            {/* 빈 화면 일때 */}
            {/* <MessageList.Content
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "1.2em",
                height: "100%",
                justifyContent: "center",
                textAlign: "center",
              }}>
              This is custom content placed instead of message list
            </MessageList.Content> */}
            <MessageSeparator
              content="Saturday, 30 November 2019"
              className="custom-separator" // 커스텀 클래스 추가
            />
            <Message
              avatarPosition="tl"
              model={{
                message: "Hello my friend",
                sentTime: "just now",
                sender: "Joe",
                direction: "outgoing",
                position: "single",
              }}>
              <Avatar
                name="Zoe"
                size="md"
                src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
              />
              <Message.Footer sender="Joe" sentTime="just now" />
            </Message>
            <Message
              avatarPosition="tl"
              model={{
                message: "Hello my kang",
                sentTime: "just now",
                sender: "kang",
                direction: "incoming",
              }}>
              <Avatar
                name="Zoe"
                size="md"
                src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
              />
              <Message.Header sender="kang" sentTime="just now" />
              <Message.Footer sender="kang" sentTime="just now" />
            </Message>
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
