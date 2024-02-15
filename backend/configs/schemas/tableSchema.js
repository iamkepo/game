import Joi from 'joi';

const tableSchema = Joi.object({
  _id: Joi.string(),
  cellules: Joi.array().items(
    Joi.object({
      row: Joi.number(),
      cel: Joi.number(),
      color: Joi.string(),
      user_id: Joi.string(),
      create_date: Joi.date(),
    })
  ),
  configs: Joi.object({
    rows: Joi.number().default(1000),
    cels: Joi.number().default(1000),
    actions: Joi.array().items(Joi.string()).default(['onmouseenter', 'onclick']),
    zooms: Joi.array().items(Joi.string()).default(['0.5px','1px','1.5px','2px','2.5px','3px','3.5px','4px','4.5px','5px']),
  }),
  status: Joi.boolean().default(false),
  create_date: Joi.date(),
  update_date: Joi.date(),
});

export default tableSchema;
