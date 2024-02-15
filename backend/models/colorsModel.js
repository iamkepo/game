import colorSchema from '../configs/schemas/colorSchema.js';
import RequestService from '../configs/services/requestService.js';
import { randomColor, randomColorLimit } from '../helpers/constants.js';

class ColorsModel extends RequestService {
  constructor() {
    super('colors', colorSchema);
  }

  static async generateRandomColors(count) {
    const randomColors = [];
    for (let i = 0; i < count; i++) {
      randomColors.push(randomColor);
    }
    return await this.addMany(randomColors);
  }

  static async getUnassignedColors() {
    const colors = await this.getAll({ status: false }, { limit: randomColorLimit });
    if (colors.length == randomColorLimit) {
      return colors;
    } else {
      const randomColors = await generateRandomColors((randomColorLimit-colors.length));
      return await this.getAll({ status: false }, { limit: randomColorLimit });
    } 
  }
}

export default ColorsModel;