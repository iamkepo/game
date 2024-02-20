import {colorsService, colorsModel} from '../models/colorsModel.js';
import { teamsModel } from '../models/teamsModel.js';

class ColorsController {

  async getColors(req, res) {
    try {
      // Récupérer des couleurs aléatoires non attribuées
      const unassignedColors = await colorsModel.getUnassignedColors();

      res.status(200).json(unassignedColors.map(el=> ({_id: el._id, color: `rgba(${el.red},${el.green},${el.blue},${el.alpha})`})));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addUserToColor(req, res) {
    try {
      const { colorId } = req.body;

      // Ajouter une couleur à un utilisateur
      const addedColor = await colorsService.update(colorId, { user_id: req.user._id });

      res.status(200).json(addedColor);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getMyColors(req, res) {
    try {
      // Récupérer la liste des couleurs par équipe
      const colors = await colorsService.getAll({ user_id: req.user._id });

      res.status(200).json(colors.map(el=> ({_id: el._id, color: `rgba(${el.red},${el.green},${el.blue},${el.alpha})`})));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async getColor(req, res) {
    try {
      const { userId } = req.params;
      
      const resultatCheck = await teamsModel.checkUserInTeam(req.user._id, userId)
      if (!resultatCheck) {
        return res.status(404).json({ error: 'This user is not in same team with you' });
      }
      // Récupérer la liste des couleurs par équipe
      const colors = await colorsService.getAll({ user_id: userId });

      res.status(200).json(colors.map(el=> ({_id: el._id, color: `rgba(${el.red},${el.green},${el.blue},${el.alpha})`})));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ColorsController;