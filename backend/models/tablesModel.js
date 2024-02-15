import tableSchema from '../configs/schemas/tableSchema.js';
import RequestService from '../configs/services/requestService.js';
import { ObjectId } from 'mongodb';

class TablesModel extends RequestService {
  constructor() {
    super('tables', tableSchema);
  }

  static async getLast() {
    const result = await this.getLastElementByDate({}, { create_date: -1 },{ cellules: 0 });
    return result;
  }
  static async getCellules(tableId) {
    const result = await this.getSortedByDate(
      { _id: ObjectId(tableId)}, 
      "create_date", 
      { cellules: 1 }
    );
    return result;
  }
  static async addOneCellule(tableId, celluleData) {
    const result = await this.findAndUpdate(
      { _id: ObjectId(tableId) },
      { $push: { cellules: celluleData } },
      {} // Ajouter un objet vide pour les options
    );
    return result;
  }
  static async addManyCellules(tableId, cellulesData) {
    const result = await this.findAndUpdate(
      { _id: ObjectId(tableId) },
      { $push: { cellules: { $each: cellulesData } } },
      {} // Ajouter un objet vide pour les options
    );
    return result;
  }
  
}

export default TablesModel;
