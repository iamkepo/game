import express from 'express';
import UsersController from '../../controllers/usersController.js';
import authenticateToken from '../../middlewares/authenticateToken.js';


const usersController = new UsersController()
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get me
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/user/me', authenticateToken, usersController.getUserMe);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 */

router.get('/users', authenticateToken, usersController.getAllUsers);

/**
 * @swagger
 *   /user/{id}:
 *     get:
 *       summary: Get user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: User retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Get user failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.get('/user/:id', authenticateToken, usersController.getUser);

/**
 * @swagger
 *   /user/{id}:
 *     put:
 *       summary: Update user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *       responses:
 *         '200':
 *           description: User updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Update user failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.put('/user/:id', authenticateToken, usersController.updateUser);

/**
 * @swagger
 *   /user/{id}:
 *     delete:
 *       summary: Delete user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: User deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Delete user failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.delete('/user/:id', authenticateToken, usersController.deleteUser);

/**
 * @swagger
 *   /user/{id}/status:
 *     patch:
 *       summary: Update user status by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newStatus:
 *                   type: string
 *       responses:
 *         '200':
 *           description: User status updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/config/schemas/usersSchema'
 *         '400':
 *           description: Invalid status or bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '404':
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Update user status failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.patch('/user/:id/status', authenticateToken, usersController.updateUserStatus);

export default router;
