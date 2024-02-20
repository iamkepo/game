import colorSchema from '../configs/schemas/colorSchema.js';
import RequestService from '../configs/services/requestService.js';
import { randomColor, colorLimit } from '../helpers/constants.js';

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

  async generateNewColors(param) {

    let limit = param;
    var lastColor = await colorsService.getLastElementByDate(
      {}, 
      'create_order', 
      { _id: 0, user_id: 0, status: 0, create_date: 0, update_date: 0 }
    );
    if (!lastColor) {
      const color = await colorsService.add(
        { 
          red: 0, 
          green: 0, 
          blue: 0, 
          alpha: 0, 
          create_order: 0,
          user_id: null,
          status: false,
          create_date: Date.now(),
          update_date: Date.now()
        }
      )
      lastColor = { red: 0, green: 0, blue: 0, alpha: 0, create_order: 0 };
      limit = limit-1;
    }
    // console.log(lastColor);
    if (lastColor._id) {
      delete lastColor._id;
    }
    // console.log(lastColor);
    let count = 0;
    let newColors = [];
    let newColor = {
        ...lastColor,
        user_id: null,
        status: false,
    };

    while (count < limit) {

      if (newColor.alpha >= 1) {
        newColor.alpha = 0;
        if (newColor.blue >= 255) {
            newColor.blue = 0;
            if (newColor.green >= 255) {
                newColor.green = 0;
                if (newColor.red >= 255) {
                    newColor.red = 0;
                } else {
                    newColor.red++;
                }
            } else {
                newColor.green++;
            }
        } else {
            newColor.blue++;
        }
      } else {
        newColor.alpha = Math.min(1, parseFloat((newColor.alpha + 0.01).toFixed(2)));
      }
        
        newColor.create_order++;
        newColor.create_date = Date.now();
        newColor.update_date = Date.now();
        newColors.push({ ...newColor }); // Ajoutez une copie de newColor à newColors
        count++;
    }
    // console.table(newColors);
    return await colorsService.addMany(newColors);
  }

  async getUnassignedColors() {
    const pipeline = [
    // Étape 1: Filtrer les couleurs où user_id est null
    {
      $match: {
        user_id: null
      }
    },
    // Étape 2: Limiter le nombre de résultats à 100
    {
      $limit: colorLimit+8
    }
  ];
    const colors = await colorsService.aggregate(pipeline);
    return colors;
  }

  async getColorsCount() {
    const count = await colorsService.getCount({});
    return count;
  }
}
export const colorsModel = new ColorsModel();