import Joi from 'joi';

const teamSchema = Joi.object({
  _id: Joi.string(),
  teamname: Joi.string().required(),
  pic: Joi.string(),
  bio: Joi.string(),
  users: Joi.array().items(Joi.string().required()),
  requests: Joi.array().items(Joi.string()), 
  invites: Joi.array().items(Joi.string()),
  creator_id: Joi.string().required(),
  type: Joi.string().valid('private', 'public'),
  status: Joi.string().valid('active', 'inactive', 'suspended'),
  create_date: Joi.date(),
  update_date: Joi.date(),
});

export default  teamSchema;
