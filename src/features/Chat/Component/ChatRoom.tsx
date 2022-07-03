import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { FC, useEffect, useRef, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  getAllChat,
  listenToMessage,
  sendMessage,
} from "services/socket.IO";
import "./ChatRoom.scss";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message";

const ChatRoom: FC<any> = ({ author }) => {
  const [message, setMessage] = useState("");
  const [mesData, setMesData] = useState<any>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const chatBoxRef = useRef<any>();

  const token = JSON.parse(localStorage.getItem("accessToken") || "{}");
  const onGetAllChat = async () => {
    const res = await getAllChat(token);
    setMesData(res.data.reverse());
  };

  useEffect(() => {
    if (token) {
      connectSocket("", token);
    }
    listenToMessage((data: any) => {
      console.log(data);
      setMesData((prev: any) => [...prev, data]);
    });

    onGetAllChat();
    return () => {
      disconnectSocket();
    };
  }, []);

  const setUptime = (time: string) => {
    const postTime = new Date(time);
    const thisTime = new Date();
    let result = "";
    if (thisTime.getFullYear() - postTime.getFullYear() > 0) {
      result = `${thisTime.getFullYear() - postTime.getFullYear()} year ago`;
    } else if (thisTime.getMonth() - postTime.getMonth() > 0) {
      result = `${thisTime.getMonth() - postTime.getMonth()} month ago`;
    } else if (thisTime.getDate() - postTime.getDate() > 0) {
      result = `${thisTime.getDate() - postTime.getDate()} day ago`;
    } else if (thisTime.getHours() - postTime.getHours() > 0) {
      result = `${thisTime.getHours() - postTime.getHours()} hours ago`;
    } else if (thisTime.getMinutes() - postTime.getMinutes() > 0) {
      result = `${thisTime.getMinutes() - postTime.getMinutes()} minutes ago`;
    } else {
      result = "a few moments";
    }
    return result;
  };

  const onSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
    if (chatBoxRef.current) {
      console.log(chatBoxRef);
      // chatBoxRef.current.onscroll(100);
    }
  };
  return !showChat ? (
    <div className="chat-icon">
      <label htmlFor="mess-icon">
        <MessageIcon style={{ fontSize: "4rem" }} />
      </label>
      <input
        id="mess-icon"
        style={{ display: "none" }}
        onClick={() => setShowChat(true)}
      ></input>
    </div>
  ) : (
    <div className="chat">
      <span className="chat-title">
        Message
        <label htmlFor="close-icon">
          <CloseIcon></CloseIcon>
        </label>
        <button
          id="close-icon"
          style={{ display: "none" }}
          onClick={() => setShowChat(false)}
        ></button>
      </span>
      <div
        ref={chatBoxRef}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {mesData.map((item: any) => (
          <div
            key={item._id}
            className="chat-content"
            style={
              author.name === item.author.firstName + " " + item.author.lastName
                ? {
                    backgroundColor: "blue",
                    alignSelf: "flex-end",
                  }
                : { backgroundColor: "#333" }
            }
          >
            <span className="chat-content__author">
              {item.author.firstName + " " + item.author.lastName}
            </span>
            <p className="chat-content__main">{item.content}</p>
            <span className="chat-content__createAt">
              {setUptime(item.updatedAt)}
            </span>
          </div>
        ))}
      </div>
      <form
        className="chat-action"
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
      >
        <input
          value={message}
          placeholder="Enter message"
          onChange={(e) => setMessage(e.target.value)}
          className="chat-action__input"
        ></input>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          className="chat-action__btn"
          onClick={() => onSendMessage()}
        ></Button>
      </form>
    </div>
  );
};

export default ChatRoom;
