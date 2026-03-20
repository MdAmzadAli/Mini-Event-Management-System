import prisma from "../config/db.js";

export const markAttendance = async ({ eventId, bookingCode }) => {

  const booking = await prisma.booking.findUnique({
    where: { bookingCode },
    include: { user: true },
  });

  if (!booking) {
    const error = new Error("Invalid booking code");
    error.status = 404;
    throw error;
  }

  if (booking.eventId !== eventId) {
    const error = new Error("Booking code does not belong to this event");
    error.status = 400;
    throw error;
  }

  const alreadyCheckedIn = await prisma.eventAttendance.findUnique({
    where: { userId_eventId: { userId: booking.userId, eventId } },
  });

  if (alreadyCheckedIn) {
    const error = new Error("Already checked in");
    error.status = 409;
    throw error;
  }

  const attendance = await prisma.eventAttendance.create({
    data: {
      userId: booking.userId,
      eventId,
    },
  });

  const totalBookings = await prisma.booking.count({
    where: { eventId },
  });

  return {
    message: "Check in successful",
    user: booking.user.name,
    entryTime: attendance.entryTime,
    totalTicketsBooked: totalBookings,
  };
};