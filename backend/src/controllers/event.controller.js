import * as eventService from "../services/event.service.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};