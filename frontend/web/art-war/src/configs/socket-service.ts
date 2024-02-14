
import { io } from "socket.io-client";
import { envConstant } from "./envConstant";

class SocketService {
   url: string;
   token: string;
   socket: any;
   constructor(token: string) {
      this.url = envConstant.BASE_URL;
      this.socket = null;
      this.token = token;
   }

   connect() {
      this.socket = io(this.url, {
        // autoConnect: false,
        extraHeaders: {
          authorization: this.token
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
