import * as attendanceService from "../services/attendance.service.js";

export const markAttendance = async (req, res, next) => {
  try {
    const result = await attendanceService.markAttendance({
      eventId: req.params.id,
      bookingCode: req.body.bookingCode,
    });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};