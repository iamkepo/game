import tableSchema from '../configs/schemas/tableSchema.js';
import RequestService from '../configs/services/requestService.js';
import { ObjectId } from 'mongodb';

export const tablesService = new RequestService('tables');
class TablesModel {
  /**
   * Ajoute un nouveau document à la collection.
   * @param {Object} data - Les données à ajouter à la collection.
   */
  async validateSchema(data) {
    const validationResult = tableSchema.validate(data)
    return validationResult;
  }
  async getLast() {
    const result = await tablesService.getLastElementByDate({}, { create_date: -1 },{ cellules: 0 });
    return result;
  }
  async getCellules(tableId) {
    const result = await tablesService.getSortedByDate(
      { _id: ObjectId(tableId)}, 
      "create_date", 
      { cellules: 1 }
    );
    return result;
  }
  async addOneCellule(tableId, celluleData) {
    const result = await tablesService.findAndUpdate(
      { _id: ObjectId(tableId) },
      { $push: { cellules: celluleData } },
      {} // Ajouter un objet vide pour les options
    );
    return result;
  }
  async addManyCellules(tableId, cellulesData) {
    const result = await tablesService.findAndUpdate(
      { _id: ObjectId(tableId) },
      { $push: { cellules: { $each: cellulesData } } },
      {} // Ajouter un objet vide pour les options
    );
    return result;
  }
  
}
export const tablesModel = new TablesModel();
