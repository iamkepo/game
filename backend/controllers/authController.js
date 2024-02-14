const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/usersModel');
const { generateAccessToken, generateRefreshToken } = require('../helpers/jwtUtils');
const { userInitData } = require('../helpers/constants');
require('dotenv').config();
const saltRounds = 10; // Number of salt rounds for bcrypt hashing

class AuthController extends UsersModel {
  static async registerUser(req, res) {
    try {
      let user = {...userInitData, ...req.body};
      
      const validationResult = await this.validateSchema(user);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error});
      }

      const existingUser = await this.findOne({ email: user.email });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;

      const newUser = await this.add(user);

      delete newUser.password;

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.status(201).json({ accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ error: `Registration failed: ${error.message}` });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      delete user.password;

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Login failed: Internal Server Error' });
    }
  }


  static async refreshTokenUser(req, res) {
    try {
      const refreshToken = req.body.refreshToken;

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
      });
    } catch (error) {
      res.status(500).json({ error: 'Refresh token failed: Internal Server Error' });
    }
  }
  

}

module.exports = AuthController;
