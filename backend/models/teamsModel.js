const teamSchema = require('../configs/schemas/teamSchema');
const RequestService = require('../configs/services/requestService');


class TeamsModel extends RequestService {
  constructor() {
    super('teams', teamSchema);
  }


  static async checkUserInTeam(id, userId) {
    return await this.findOne({ users: { $in: [id, userId] } });
  }
}

module.exports = TeamsModel;