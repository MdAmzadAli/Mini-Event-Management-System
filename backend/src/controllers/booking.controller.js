import * as bookingService from "../services/booking.service.js";

export const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.params.id);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
};