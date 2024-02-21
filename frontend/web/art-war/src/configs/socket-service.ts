"use client";
import { io } from "socket.io-client";
import { envConstant } from "./envConstant";

class SocketService {
  url: string;
  socket: any;
  constructor() {
    this.url = envConstant.BASE_URL;
    this.socket = null;
  }

  connect() {
    this.socket = io(this.url, {
      // autoConnect: false,
      extraHeaders: {
        authorization: 'Bearer '+window.localStorage.getItem("accessToken")
      }
    });
    this.socket.on("connect", () => {
      console.log(this.socket?.id);
    });
  
  
    this.socket.on('Click', (click: object) => {
      console.log(click);
    })

    return this.socket;
  }

}

export default SocketService;
