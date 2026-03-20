import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as bookingController from "../controllers/booking.controller.js";
import validate from "../middlewares/validate.js";
import { createUserSchema } from "../validators/user.validator.js";

const router = Router();

router.post("/", validate(createUserSchema), userController.createUser);
router.get("/:id/bookings", bookingController.getUserBookings);

export default router;