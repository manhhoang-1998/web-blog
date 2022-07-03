import { io, Socket } from "socket.io-client";
import Api, { setToken } from "./api";

let socket: Socket;
export const connectSocket = (room: string, token: string) => {
  if (token) {
    socket = io("https://ans.devcamperapp.xyz/chat", {
      auth: {
        Authorization: token,
      },
    });
  }
};

export const listenToMessage = (callBack: (data: any) => any) => {
  if (socket) {
    socket.on("receive_message", (data: any) => {
      return callBack(data);
    });
  }
};

export const sendMessage = (message: string) => {
  if (socket) {
    socket.emit("send_message", message);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("discn");
  }
};

export const getAllChat = (token: string) => {
  setToken(token);
  return Api.get("/chat?limit=10&createdAt[sort]=desc");
};
