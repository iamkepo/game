const express = require('express');
const TeamsController = require('../../controllers/teamsController');
const authenticateToken = require('../../middlewares/authenticateToken');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API for managing teams
 */


/**
 * @swagger
 * /team:
 *   post:
 *     summary: Create a new team
 *     description: Create a new team with the provided data.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     requestBody:
 *             
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Bad request
 */

router.post('/team', authenticateToken, TeamsController.createTeam);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: Retrieve a list of all teams to which the logged-in user belongs.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 
 */
router.get('/teams', authenticateToken, TeamsController.getAllTeams);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Get a team by ID
 *     description: Retrieve a single team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               
 *       404:
 *         description: Team not found
 */
router.get('/team/:id', authenticateToken, TeamsController.getTeam);

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     summary: Update a team by ID
 *     description: Update an existing team with the provided data.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *             
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Team not found
 */
router.put('/team/:id', authenticateToken, TeamsController.updateTeam);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     description: Delete an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 */
router.delete('/team/:id', authenticateToken, TeamsController.deleteTeam);

/**
 * @swagger
 * /team/{id}/status:
 *   patch:
 *     summary: Update team status by ID
 *     description: Update the status of an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive, suspended]
 *     responses:
 *       200:
 *         description: Team status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Team not found
 */
router.patch('/team/:id/status', authenticateToken, TeamsController.updateTeamStatus);

/**
 * @swagger
 * /team/{id}/request:
 *   patch:
 *     summary: Send request to join a team
 *     description: Send a request to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request sent successfully
 *       404:
 *         description: Team not found
 */
router.patch('/team/:id/request', authenticateToken, TeamsController.requestTeam);

/**
 * @swagger
 * /team/{id}/invite:
 *   patch:
 *     summary: Send invitation to user to join a team
 *     description: Send an invitation to a user to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invitation sent successfully
 *       404:
 *         description: Team not found
 */
router.patch('/team/:id/invite', authenticateToken, TeamsController.inviteTeam);

/**
 * @swagger
 * /team/{id}/accept-request:
 *   patch:
 *     summary: Accept request to join a team
 *     description: Accept a request to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request accepted successfully
 *       404:
 *         description: Team not found
 */
router.patch('/team/:id/accept-request', authenticateToken, TeamsController.acceptRequestTeam);

/**
 * @swagger
 * /team/{id}/accept-invite:
 *   patch:
 *     summary: Accept invitation to join a team
 *     description: Accept an invitation to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *       404:
 *         description: Team not found
 */
router.patch('/team/:id/accept-invite', authenticateToken, TeamsController.acceptJoinTeam);

/**
 * @swagger
 * /team/{id}/remove-invite/{userId}:
 *   delete:
 *     summary: Remove invitation to join a team
 *     description: Remove an invitation sent to a user to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         description: ID of the user to remove invitation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation removed successfully
 *       404:
 *         description: Team not found
 */
router.delete('/team/:id/remove-invite/:userId', authenticateToken, TeamsController.removeInvitationTeam);

/**
 * @swagger
 * /team/{id}/remove-request/{userId}:
 *   delete:
 *     summary: Remove request to join a team
 *     description: Remove a request sent by a user to join an existing team by its ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         description: ID of the user to remove request
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request removed successfully
 *       404:
 *         description: Team not found
 */
router.delete('/team/:id/remove-request/:userId', authenticateToken, TeamsController.removeRequestTeam);

module.exports = router;
