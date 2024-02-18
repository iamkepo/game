import colorSchema from '../configs/schemas/colorSchema.js';
import RequestService from '../configs/services/requestService.js';
import { randomColor, randomColorLimit } from '../helpers/constants.js';

export const colorsService = new RequestService('colors');
class ColorsModel {
  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   */
  async validateSchema(data) {
    const validationResult = colorSchema.validate(data)
    return validationResult;
  }
  async generateRandomColors(count) {
    const randomColors = [];
    for (let i = 0; i < count; i++) {
      randomColors.push(randomColor);
    }
    return await colorsService.addMany(randomColors);
  }

  async getUnassignedColors() {
    const colors = await colorsService.getAll({ status: false }, { limit: randomColorLimit });
    if (colors.length == randomColorLimit) {
      return colors;
    } else {
      const randomColors = await generateRandomColors((randomColorLimit-colors.length));
      return await colorsService.getAll({ status: false }, { limit: randomColorLimit });
    } 
  }
}
export const colorsModel = new ColorsModel();