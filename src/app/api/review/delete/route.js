import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const DELETE = async (req) => {
  const user = await currentUser();

  try {
    const data = await req.json();

    // 1. Authentication Check
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2. Delete the record from PostgreSQL
    await prisma.review.delete({
      where: {
        id: data.reviewId, // Matches the 'id' primary key in your schema
      },
    });

    return new Response("Review deleted", { status: 200 });
  } catch (error) {
    console.log("Error deleting review:", error);
    return new Response("Error deleting review", { status: 500 });
  }
};
