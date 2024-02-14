const UsersModel = require('../models/usersModel');

class UsersController extends UsersModel{

  static async getUserMe(req, res) {
    try {
      res.status(201).json(req.user);
    } catch (error) {
      res.status(500).json({ error: 'Get me failed: Internal Server Error' });
    }
  }

  static async createUser(req, res) {
    try {
      const validationResult = await this.validateSchema(req.body);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error});
      }
      const newUser = await this.add(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: `User creation failed: ${error.message}` });
    }
  }

  static async getAllUsers(req, res) {
    try {
      // Get all users from the database
      const allUsers = await this.getAll({}, {}, { password: 0 });

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: 'Get all Users failed: Internal Server Error' });
    }
  }

  static async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await this.get(userId, { password: 0 });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Get user failed: Internal Server Error' });
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.params.id;
      
      const validationResult = await this.validateSchema(req.body);
      if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error});
      }

      const updateResult = await this.update(userId, req.body);

      if (!updateResult) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Update user failed: Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deleteResult = await this.delete(userId);

      if (!deleteResult) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Delete user failed: Internal Server Error' });
    }
  }

  static async updateUserStatus(req, res) {
    try {
      const userId = req.params.id;

      // Validate the newStatus against your allowed status values
      // For example, you might have an array of allowed statuses
      const allowedStatuses = ['active', 'inactive', 'suspended'];
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      // Update the user status
      const updatedUser = await this.findAndUpdate(
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
  
  static async addColorToUser(req, res) {
    try {
      const { userId, colorId } = req.body;

      // Ajouter une couleur à un utilisateur
      const addedColor = await this.assignColorToUser(userId, colorId);

      res.status(200).json(addedColor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
