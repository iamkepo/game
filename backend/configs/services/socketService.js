import { Server } from 'socket.io';
import socketAuthenticateToken from "../../middlewares/socketAuthenticateToken.js";

import TablesModel from "../../models/tablesModel.js";
import UsersModel from "../../models/usersModel.js";


function socketService(server) {
  // Initialize WebSocket connection
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH"]
    },
    maxHttpBufferSize: 1e8 // 100 MB
  });

  io.engine.use(socketAuthenticateToken);
  
  io.on('connection', async (socket) => {
    // console.log(socket?.id);

    switch (socket?.request?.message) {
      case "valid token":
        console.log('A user connected');
        // const user = await UsersModel.socketGetUserById(socket?.request?.user._id);
        // const updateResult = await UsersModel.socketConnectUser(socket);
        // socket.broadcast.emit('userIsConnect', user);
        break;

      default:
        console.log('A visitor connected');
        console.log(socket?.request?.message);
        break;
    }

    socket.on('onclick', async(tableId, dataCellule) => {
      //console.log(onclick);
      // const userId = await UsersModel.findOne({socket_id: socket.id}, { _id: 1 });

      // const data = await TablesModel.addOneCellule(tableId, dataCellule);

      // io.emit('onclick', data);
    });

    socket.on('onmouseenter', async(tableId, dataCellules) => {
      //console.log(click);
      // const userId = await UsersModel.findOne({socket_id: socket.id}, { _id: 1 });
      
      // const data = await TablesModel.addManyCellules(tableId, dataCellules);

      // io.emit('onmouseenter', data);
    });
    
    socket.on('disconnect', async () => {
      console.log('user disconnected');
      // const user = await UsersModel.socketGetUser(socket);
      // const updateResult = await UsersModel.socketdisconnectUser(socket);
      // socket.broadcast.emit('userIsDisconnect', user);
    });
  });

}

export default socketService;