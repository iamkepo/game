const Joi = require('joi');

const colorSchema = Joi.object({
  _id: Joi.string(),
  user_id: Joi.string(),
  red: Joi.number().min(0).max(255).required(),
  green: Joi.number().min(0).max(255).required(),
  blue: Joi.number().min(0).max(255).required(),
  alpha: Joi.number().min(0).max(1).required(),
  status: Joi.boolean().default(false),
  create_date: Joi.date(),
  update_date: Joi.date(),
});

module.exports = colorSchema;
