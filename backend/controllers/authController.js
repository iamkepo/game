import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import { usersService, usersModel } from '../models/usersModel.js';
import { generateAccessToken, generateRefreshToken } from '../helpers/jwtUtils.js';
import { saltRounds, userInitData } from '../helpers/constants.js';
import { validationError } from '../helpers/errorsHandler.js';

import dotenv from 'dotenv';
dotenv.config();


export default class AuthController {
  async registerUser(req, res) {
    try {
      
      const validationResult = await usersModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const existingUser = await usersService.getOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      let credentials = { ...userInitData, ...req.body};

      const hashedPassword = await hash(credentials.password, saltRounds);
      credentials.password = hashedPassword;

      const newUser = await usersService.add(credentials);
      if (!newUser.insertedId) {
        return res.status(405).json({ error: 'User creation failed' });
      }

      res.status(201).json(newUser);
    } catch (error) {
      // console.log(error);
      res.status(400).json({ error: `Registration failed: ${error.message}` });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await usersService.getOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Compare the provided password with the hashed password
      const passwordMatch = await compare(password, user.password);

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


  async refreshTokenUser(req, res) {
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