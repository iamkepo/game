import teamSchema from '../configs/schemas/teamSchema.js';
import RequestService from '../configs/services/requestService.js';

export const teamsService = new RequestService('teams');
class TeamsModel {
  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   */
  async validateSchema(data) {
    const validationResult = teamSchema.validate(data)
    return validationResult;
  }

  async checkUserInTeam(id, userId) {
    return await teamsService.getOne({ users: { $in: [id, userId] } });
  }
}
export const teamsModel = new TeamsModel();