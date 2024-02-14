const TablesModel = require("../models/tablesModel");

class TablesController extends TablesModel {
  static async createTable(req, res) {
    try {
      const table = req.body;
      const validationResult = await this.validateSchema(table);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error});
      }

      const newTable = await this.add(req.body);
      res.status(201).json(newTable);
    } catch (error) {
      res.status(400).json({ error: `Table creation failed: ${error.message}` });
    }
  }

  static async getAllTables(req, res) {
    try {
      const allTables = await this.getAll();
      res.status(200).json(allTables);
    } catch (error) {
      res.status(500).json({ error: 'Get all tables failed: Internal Server Error' });
    }
  }

  static async getTable(req, res) {
    try {
      const tableId = req.params.id;
      const table = await this.get(tableId);
      if (!table) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ error: 'Get table failed: Internal Server Error' });
    }
  }

  static async updateTable(req, res) {
    try {
      const tableId = req.params.id;
      const validationResult = await this.validateSchema(req.body);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error});
      }
      const updateResult = await this.update(tableId, req.body);
      if (!updateResult) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json({ message: 'Table updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update table failed: Internal Server Error' });
    }
  }

  static async deleteTable(req, res) {
    try {
      const tableId = req.params.id;
      const deleteResult = await this.delete(tableId);
      if (!deleteResult) {
        return res.status(404).json({ error: 'Table not found' });
      }
      res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete table failed: Internal Server Error' });
    }
  }

  static async getLastTable(req, res) {
    try {
      const lastTable = await this.getLast();
      res.status(200).json(lastTable);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCellulesTable(req, res) {
    try {
      const { tableId } = req.params;
      const cellules = await this.getCellules(tableId);
      res.status(200).json(cellules);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addOneCelluleTable(req, res) {
    try {
      const { tableId } = req.params;
      const celluleData = req.body;
      const result = await this.addOneCellule(tableId, celluleData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  static async addManyCellulesTable(req, res) {
    try {
      const { tableId } = req.params;
      const cellulesData = req.body;
      const result = await this.addManyCellules(tableId, cellulesData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TablesController;
