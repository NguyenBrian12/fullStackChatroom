const Joi = require("joi");
const schema = {
  id: Joi.number(),
  appUserId: Joi.number(),
  message: Joi.string()
    .min(1)
    .max(500)
    .required()
};
module.exports = Joi.object().keys(schema);
