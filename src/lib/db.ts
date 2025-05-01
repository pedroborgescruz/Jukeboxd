import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (email: string, name: string, password: string) => {
  return prisma.user.create({
    data: { email, name, password },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};