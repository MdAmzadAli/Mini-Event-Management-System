import { Router } from "express";
import * as bookingController from "../controllers/booking.controller.js";
import validate from "../middlewares/validate.js";
import { createBookingSchema } from "../validators/booking.validator.js";

const router = Router();

router.post("/", validate(createBookingSchema), bookingController.createBooking);

export default router;