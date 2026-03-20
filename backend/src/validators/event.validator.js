import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  date: Joi.date().greater("now").required(),
  totalCapacity: Joi.number().integer().min(1).required(),
});