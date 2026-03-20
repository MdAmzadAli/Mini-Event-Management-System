import prisma from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createBooking = async ({ userId, eventId }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  const existingBooking = await prisma.booking.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });
  if (existingBooking) {
    const error = new Error("You have already booked this event");
    error.status = 409;
    throw error;
  }

  const booking = await prisma.$transaction(async (tx) => {
    const lockedEvent = await tx.$queryRaw`
      SELECT id, remainingTickets 
      FROM Event 
      WHERE id = ${eventId} 
      FOR UPDATE
    `;

    if (!lockedEvent[0] || lockedEvent[0].remainingTickets < 1) {
      const error = new Error("No tickets available");
      error.status = 400;
      throw error;
    }

    await tx.event.update({
      where: { id: eventId },
      data: { remainingTickets: { decrement: 1 } },
    });

    const newBooking = await tx.booking.create({
      data: {
        userId,
        eventId,
        bookingCode: uuidv4(),
      },
    });

    return newBooking;
  });

  return booking;
};

export const getUserBookings = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return await prisma.booking.findMany({
    where: { userId },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          date: true,
          description: true,
        },
      },
    },
    orderBy: { bookingDate: "desc" },
  });
};