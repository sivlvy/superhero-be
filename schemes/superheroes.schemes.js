const Joi = require("joi");

const createSuperheroSchema = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

const updateSuperheroSchema = Joi.object({
  nickname: Joi.string().optional(),
  real_name: Joi.string().optional(),
  origin_description: Joi.string().optional(),
  superpowers: Joi.string().optional(),
  catch_phrase: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

module.exports = {
  createSuperheroSchema,
  updateSuperheroSchema,
};
