import userSchema from '../configs/schemas/userSchema.js';
import RequestService from '../configs/services/requestService.js';

export const usersService = new RequestService('users');

class UsersModel {
  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   */
 async validateSchema(data) {
    const validationResult = userSchema.validate(data)
    return validationResult;
  }

 async socketGetUserById(userId) {
    const result = await usersService.get(userId, { password: 0 });
    return result;
  };

 async socketGetUser(socket) {
    const result = await usersService.getOne({ socket_id: socket?.id }, { password: 0 });
    return result;
  };

 async socketConnectUser (socket) {
    const updateResult = await usersService.update(socket?.request?.user._id, { socket_id: socket?.id });
    return updateResult
  };

 async socketdisconnectUser(socket) {
    const updateResult = await usersService.update(socket?.id, { socket_id: undefined });
    return updateResult;
  };
  
};

export const usersModel = new UsersModel()
