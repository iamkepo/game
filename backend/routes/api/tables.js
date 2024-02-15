import { Router } from 'express';
import TablesController from '../../controllers/TablesController.js';
import authenticateToken from '../../middlewares/authenticateToken.js';
import freeAuthenticateToken from '../../middlewares/freeAuthenticateToken.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tables
 *   description: Operations related to tables
 */

/**
 * @swagger
 * /tables:
 *   post:
 *     summary: Create a new table
 *     tags: [Tables]
 *     responses:
 *       201:
 *         description: Returns the newly created table
 */
router.post('/table', authenticateToken, TablesController.createTable);

/**
 * @swagger
 * /table/{tableId}:
 *   get:
 *     summary: Get a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the table
 *     responses:
 *       200:
 *         description: Returns the table
 */
router.get('/table/:tableId', authenticateToken, TablesController.getTable);

/**
 * @swagger
 * /table/{tableId}:
 *   put:
 *     summary: Update a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the table
 *       - in: body
 *         name: tableData
 *         required: true
 *         description: The updated table data
 *         schema:
 *           type: object
 *           properties:
 *             // Define properties to update
 *     responses:
 *       200:
 *         description: Returns the updated table
 */
router.put('/table/:tableId', authenticateToken, TablesController.updateTable);

/**
 * @swagger
 * /table/{tableId}:
 *   delete:
 *     summary: Delete a table by ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the table
 *     responses:
 *       200:
 *         description: Table deleted successfully
 */
router.delete('/table/:tableId', authenticateToken, TablesController.deleteTable);

/**
 * @swagger
 * /table/current:
 *   get:
 *     summary: Get the last table
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Returns the last table
 */
router.get('/table/current', authenticateToken, TablesController.getLastTable);

/**
 * @swagger
 * /table/{tableId}/cellules:
 *   get:
 *     summary: Get cellules by table ID
 *     tags: [Tables]
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the table
 *     responses:
 *       200:
 *         description: Returns cellules by table ID
 */
router.get('/table/:tableId/cellules', authenticateToken, TablesController.getCellulesTable);

/**
 * @swagger
 * /tables:
 *   get:
 *     summary: Get all tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: Returns the tables
 */
router.get('/tables', freeAuthenticateToken, TablesController.getAllTables);

export default router;
