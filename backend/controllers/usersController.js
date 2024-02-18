import { validationError } from '../helpers/errorsHandler.js';
import { usersService, usersModel } from '../models/usersModel.js';

export default class UsersController {

  async getUserMe(req, res) {
    try {
      res.status(201).json(req.user);
    } catch (error) {
      res.status(500).json({ error: 'Get me failed: Internal Server Error' });
    }
  }

  async createUser(req, res) {
    try {
      const validationResult = await usersModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }
      const newUser = await usersService.add(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: `User creation failed: ${error.message}` });
    }
  }

  async getAllUsers(req, res) {
    try {
      // Get all users from the database
      const allUsers = await usersService.getAll({}, {}, { password: 0 });

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: 'Get all Users failed: Internal Server Error' });
    }
  }

  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await usersService.get(userId, { password: 0 });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Get user failed: Internal Server Error' });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      
      const validationResult = await usersModel.validateSchema(req.body);
      if (validationResult?.error) {
        return res.status(400).json({ error: validationError(validationResult.error)});
      }

      const updateResult = await usersService.update(userId, req.body);

      if (!updateResult) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update user failed: Internal Server Error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deleteResult = await usersService.delete(userId);

      if (!deleteResult) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete user failed: Internal Server Error' });
    }
  }

  async updateUserStatus(req, res) {
    try {
      const userId = req.params.id;

      // Validate the newStatus against your allowed status values
      // For example, you might have an array of allowed statuses
      const allowedStatuses = ['active', 'inactive', 'suspended'];
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      // Update the user status
      const updatedUser = await usersService.findAndUpdate(
        { _id: userId },
        { $set: { status: req.body.status } },
        { returnDocument: 'after' }, // Return the modified document
        { password: 0 }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }  
  
  async addColorToUser(req, res) {
    try {
      const { userId, colorId } = req.body;

      // Ajouter une couleur à un utilisateur
      const addedColor = await usersService.assignColorToUser(userId, colorId);

      res.status(200).json(addedColor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}