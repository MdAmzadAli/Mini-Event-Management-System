import prisma from "../config/db.js";

export const createUser = async ({ name, email }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  return await prisma.user.create({
    data: { name, email },
  });
};