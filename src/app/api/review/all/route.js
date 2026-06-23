import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    // Fetch all reviews from PostgreSQL sorted by newest first
    const feedPosts = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(feedPosts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("Error getting posts:", error);
    return new Response("Error getting posts", {
      status: 500,
    });
  }
};