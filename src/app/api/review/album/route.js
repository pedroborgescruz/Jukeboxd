import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    // 1. Fetch reviews directly from PostgreSQL ordered by newest first
    const feedPosts = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2. Return the data as a clean JSON response
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