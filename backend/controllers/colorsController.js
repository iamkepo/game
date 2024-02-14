const ColorsModel = require('../models/colorsModel');
const TeamsController= require('./teamsController');

class ColorsController extends ColorsModel {

  static async getColors(req, res) {
    try {
      // Récupérer des couleurs aléatoires non attribuées
      const unassignedColors = this.getUnassignedColors();

      res.status(200).json(unassignedColors);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addUserToColor(req, res) {
    try {
      const { userId, colorId } = req.body;

      // Ajouter une couleur à un utilisateur
      const addedColor = await this.update(colorId, { user_id: userId });

      res.status(200).json(addedColor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getColor(req, res) {
    try {
      const { userId } = req.params;
      
      const resultatCheck = await TeamsController.checkUserInTeam(req.user._id, userId)
      if (!resultatCheck) {
        return res.status(404).json({ error: 'This user is not in same team with you' });
      }
      // Récupérer la liste des couleurs par équipe
      const colors = await this.getAll({ user_id: userId });

      res.status(200).json(colors);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = ColorsController;