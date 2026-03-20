import { Router } from "express";
import * as attendanceController from "../controllers/attendance.controller.js";
import validate from "../middlewares/validate.js";
import { checkAttendanceSchema } from "../validators/attendance.validator.js";

const router = Router();

router.post("/:id/attendance", validate(checkAttendanceSchema), attendanceController.markAttendance);

export default router;