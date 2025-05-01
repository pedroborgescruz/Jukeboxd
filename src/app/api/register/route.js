import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, username, password } = await request.json();

    // Check if user with this email or username already exists
    const existingEmailUser = await prisma.user.findFirst({
      where: {
        email
      }
    });

    const existingUsernameUser = await prisma.user.findFirst({
      where: {
        username
      }
    });

    // Return specific error message if email or username is taken
    if (existingEmailUser) {
      return NextResponse.json({
        error: "This email is already taken."
      }, { status: 409 });
    }

    if (existingUsernameUser) {
      return NextResponse.json({
        error: "This username is already taken."
      }, { status: 409 });
    }

    // Create the user if no conflicts are found
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });

    return NextResponse.json({ message: "User created successfully.", user }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      error: "Internal server error."
    }, { status: 500 });
  }
}