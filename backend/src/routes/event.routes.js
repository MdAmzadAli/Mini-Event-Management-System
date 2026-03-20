import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";
import validate from "../middlewares/validate.js";
import { createEventSchema } from "../validators/event.validator.js";

const router = Router();

router.get("/", eventController.getAllEvents);
router.post("/", validate(createEventSchema), eventController.createEvent);

export default router;