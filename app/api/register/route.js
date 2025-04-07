import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request) {
  const { email, username, password } = await request.json();

  const user = await prisma.user.create ({
    data: {
      email,
      username,
      password
    },
  });

  return NextResponse.json({ message: "User created successfully.", user })
}