import Joi from "joi";

export const checkAttendanceSchema = Joi.object({
  bookingCode: Joi.string().uuid().required(),
});