import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const POST = async (req) => {
  const user = await currentUser();

  try {
    const data = await req.json();
    console.log("Received data in /api/review/create:", data);

    // Fallback: Check userMongoId from payload, or fall back to Clerk metadata if empty
    const resolvedUserId = data.userMongoId || user?.publicMetadata?.userMongoId;

    if (!user || !resolvedUserId) {
      console.log("Unauthorized structural state:", { user, resolvedUserId });
      return new Response("Unauthorized or Missing User Context", {
        status: 401,
      });
    }

    // Double check that the user record actually exists in PostgreSQL first
    const dbUserExists = await prisma.user.findUnique({
      where: { id: resolvedUserId }
    });

    if (!dbUserExists) {
      return new Response("User record does not exist in local DB yet", {
        status: 400,
      });
    }

    // Create the record in PostgreSQL via Prisma safely
    const newReview = await prisma.review.create({
      data: {
        albumId: data.albumId,
        userId: resolvedUserId, 
        name: data.name || "Anonymous",
        username: data.username || "", // Prevent passing null into required string schemas
        text: data.text || "",
        profileImg: data.profileImg || "",
      },
    });

    if (data.albumId) {
      revalidatePath(`/album/${data.albumId}`);
    }

    return new Response(JSON.stringify(newReview), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.log("Error creating review:", error);
    return new Response("Error creating review", {
      status: 500,
    });
  }
};
