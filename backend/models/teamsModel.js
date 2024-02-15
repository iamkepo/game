import teamSchema from '../configs/schemas/teamSchema.js';
import RequestService from '../configs/services/requestService.js';


class TeamsModel extends RequestService {
  constructor() {
    super('teams', teamSchema);
  }


  static async checkUserInTeam(id, userId) {
    return await this.getOne({ users: { $in: [id, userId] } });
  }
}

export default TeamsModel;