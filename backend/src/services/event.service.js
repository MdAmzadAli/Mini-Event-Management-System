import prisma from "../config/db.js";

export const getAllEvents = async () => {
  return await prisma.event.findMany({
    where: {
      date: { gte: new Date() },
    },
    orderBy: { date: "asc" },
  });
};

export const createEvent = async (data) => {
  const { title, description, date, totalCapacity } = data;

  return await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      totalCapacity,
      remainingTickets: totalCapacity,
    },
  });
};