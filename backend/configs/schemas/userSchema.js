import Joi from 'joi';

const userSchema = Joi.object({
  _id: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  pic: Joi.string().optional(),
  bio: Joi.string().optional(),
  config: Joi.object({
    action: Joi.string().default('onclick'),
    mode: Joi.string().default('light-mode'), // Correction de la faute de frappe "ligth-mode" à "light-mode"
    zoom: Joi.string().default('0.5px'),
  }).optional(), // Rendre l'objet config optionnel
  status: Joi.string().valid('active', 'inactive', 'suspended').optional(), // Rendre le statut optionnel
  create_date: Joi.date().optional(), // Rendre les champs de date optionnels
  update_date: Joi.date().optional(),
  last_date: Joi.date().optional(),
  socket_id: Joi.string().optional(),
});

export default userSchema;
