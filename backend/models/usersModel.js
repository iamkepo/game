const userSchema = require('../configs/schemas/userSchema');
const RequestService = require('../configs/services/requestService');

class UsersModel extends RequestService {
  constructor() {
    super('users', userSchema);
  }

  static async socketGetUserById(userId) {
    const result = await this.get(userId, { password: 0 });
    return result;
  };

  static async socketGetUser(socket) {
    const result = await this.findOne({ socket_id: socket?.id }, { password: 0 });
    return result;
  };

  static async socketConnectUser (socket) {
    const updateResult = await this.update(socket?.request?.user._id, { socket_id: socket?.id });
    return updateResult
  };

  static async socketdisconnectUser(socket) {
    const updateResult = await this.update(socket?.id, { socket_id: undefined });
    return updateResult;
  };
  
}

module.exports = UsersModel;
