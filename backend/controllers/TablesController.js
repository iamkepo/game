import { validationError } from '../helpers/errorsHandler.js';
import { tablesService, tablesModel } from '../models/tablesModel.js';

class TablesController {
  async createTable(req, res) {
    try {
      const table = req.body;
      const validationResult = await tablesModel.validateSchema(table);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const newTable = await tablesService.add(req.body);
      res.status(201).json(newTable);
    } catch (error) {
      res.status(400).json({ error: `Table creation failed: ${error.message}` });
    }
  }

  async getAllTables(req, res) {
    try {
      const allTables = await tablesService.getAll();
      res.status(200).json(allTables);
    } catch (error) {
      res.status(500).json({ error: 'Get all tables failed: Internal Server Error' });
    }
  }

  async getTable(req, res) {
    try {
      const tableId = req.params.id;
      const table = await tablesService.get(tableId);
      if (!table) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: 'Get table failed: Internal Server Error' });
    }
  }

  async updateTable(req, res) {
    try {
      const tableId = req.params.id;
      const validationResult = await tablesModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }
      const updateResult = await tablesService.update(tableId, req.body);
      if (!updateResult) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json({ message: 'Table updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update table failed: Internal Server Error' });
    }
  }

  async deleteTable(req, res) {
    try {
      const tableId = req.params.id;
      const deleteResult = await tablesService.delete(tableId);
      if (!deleteResult) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete table failed: Internal Server Error' });
    }
  }

  async getLastTable(req, res) {
    try {
      const lastTable = await tablesModel.getLast();
      res.status(200).json(lastTable);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCellulesTable(req, res) {
    try {
      const { tableId } = req.params;
      const cellules = await tablesModel.getCellules(tableId);
      res.status(200).json(cellules);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addOneCelluleTable(req, res) {
    try {
      const { tableId } = req.params;
      const celluleData = req.body;
      const result = await tablesModel.addOneCellule(tableId, celluleData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async addManyCellulesTable(req, res) {
    try {
      const { tableId } = req.params;
      const cellulesData = req.body;
      const result = await tablesModel.addManyCellules(tableId, cellulesData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default TablesController;
