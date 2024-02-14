const express = require('express');
const AuthController = require('../../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 *   /auth/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 pic:
 *                   type: string
 *                   example: "https://example.com/profile-pic.jpg"
 *                 fullname:
 *                   type: string
 *                   example: "John Doe"
 *                 bio:
 *                   type: string
 *                   example: "Food enthusiast and explorer"
 *                 status:
 *                   type: string
 *                   example: "active"
 *                 type:
 *                   type: string
 *                   example: "client"
 *                 location:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Home"
 *                       lon:
 *                         type: string
 *                         example: "40.7128"
 *                       lat:
 *                         type: string
 *                         example: "-74.0060"
 *               required:
 *                 - phone
 *                 - type
 *       responses:
 *         '201':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
 *                     type: string
 *         '400':
 *           description: User registration failed
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.post('/auth/register', AuthController.registerUser);

/**
 * @swagger
 *   /auth/login:
 *     post:
 *       summary: Login and get access token and refresh token
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *               required:
 *                 - phone
 *       responses:
 *         '200':
 *           description: Login successful, tokens retrieved
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                   refreshToken:
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
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.post('/auth/login', AuthController.loginUser);

/**
 * @swagger
 *   /auth/refresh-token:
 *     post:
 *       summary: Refresh access token
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *               required:
 *                 - refreshToken
 *       responses:
 *         '200':
 *           description: New access token generated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *         '403':
 *           description: Forbidden, invalid refresh token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 */

router.post('/auth/refresh-token', AuthController.refreshTokenUser);

module.exports = router;
