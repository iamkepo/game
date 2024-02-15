
import { io } from "socket.io-client";
import { envConstant } from "./envConstant";
import store from "@/lib/store";

class SocketService {
   url: string;
   token: string|null;
   socket: any;
   constructor() {
      this.url = envConstant.BASE_URL;
      this.socket = null;
      this.token = store.getState().auth.accessToken;
   }

   connect() {
      this.socket = io(this.url, {
        // autoConnect: false,
        extraHeaders: {
          authorization: this.token || ''
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
