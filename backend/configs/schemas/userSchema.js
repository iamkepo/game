const Joi = require('joi');

const userSchema = Joi.object({
  _id: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  username: Joi.string(),
  pic: Joi.string(),
  bio: Joi.string(),
  config: Joi.object({
    action: Joi.string().default('onclick'),
    mode: Joi.string().default('ligth-mode'),
    zoom: Joi.string().default('0.5px'),
  }), 
  status: Joi.string().valid('active', 'inactive', 'suspended'),
  create_date: Joi.date(),
  update_date: Joi.date(),
  last_date: Joi.date(),
  socket_id: Joi.string(),
});

module.exports = userSchema;
