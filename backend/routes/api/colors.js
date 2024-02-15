import { Router } from 'express';
import ColorsController from '../../controllers/colorsController.js';
import authenticateToken from '../../middlewares/authenticateToken.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Colors
 *   description: API for managing colors
 */

/**
 * @swagger
 * /colors/unassigned:
 *   get:
 *     summary: Get all unassigned colors random.
 *     description: Récupère un nombre spécifié de couleurs aléatoires non attribuées.
 *     tags: [Colors]
 *     parameters:
 *       - in: query
 *         name: count
 *         description: Nombre de couleurs aléatoires non attribuées à récupérer.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: Succès. Retourne un tableau de couleurs aléatoires non attribuées.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/colors/unassigned', ColorsController.getColors);

/**
 * @swagger
 * /color/user:
 *   post:
 *     summary: Add a user on color.
 *     description: Ajoute une couleur spécifiée à un utilisateur spécifié.
 *     tags: [Colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur.
 *               colorId:
 *                 type: string
 *                 description: ID de la couleur à ajouter à l'utilisateur.
 *     responses:
 *       200:
 *         description: Succès. Retourne la couleur ajoutée à l'utilisateur.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post('/color/user', authenticateToken, ColorsController.addUserToColor);

/**
 * @swagger
 * /colors/team/{userId}:
 *   get:
 *     summary: Get all colors for user in the same team with me.
 *     description: Récupère la liste des couleurs attribuées à une équipe spécifiée.
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: userId
 *         description: ID de l'équipe.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès. Retourne la liste des couleurs de l'équipe.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get('/color/:userId', authenticateToken, ColorsController.getColor);

export default router;
