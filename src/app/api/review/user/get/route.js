import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    const data = await req.json();
    
    // Extract the userId from your payload. 
    // In your previous client file, you sent: body: JSON.stringify({ user: userId })
    const targetUserId = data.user; 

    if (!targetUserId) {
      return new Response("User ID is required", { status: 400 });
    }

    // Fetch the specific user's reviews from PostgreSQL ordered by newest first
    const reviews = await prisma.review.findMany({
      where: {
        userId: targetUserId, // Ensure 'userId' matches your schema column name
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new Response(JSON.stringify(reviews), { 
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Failed to fetch user review data:", err);
    return new Response("Failed to fetch the review data", { status: 500 });
  }
};
