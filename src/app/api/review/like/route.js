import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const PUT = async (req) => {
  const user = await currentUser();

  try {
    const data = await req.json();

    // 1. Authorization check
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Capture the Clerk profile identifier string
    const userId = user.publicMetadata.userMongoId || user.id;
    const reviewId = data.postId;

    if (!reviewId) {
      return new Response("Post ID is required", { status: 400 });
    }

    // 2. Fetch the target review to see its current likes list
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return new Response("Review not found", { status: 404 });
    }

    // 3. Compute the updated array elements
    let updatedLikes = [...(review.likes || [])];
    
    if (updatedLikes.includes(userId)) {
      // Unlike: Filter out the user ID string
      updatedLikes = updatedLikes.filter((id) => id !== userId);
    } else {
      // Like: Append the user ID string
      updatedLikes.push(userId);
    }

    // 4. Save the modified array back to PostgreSQL
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        likes: updatedLikes,
      },
    });

    return new Response(JSON.stringify(updatedReview), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Error toggling like status:", error);
    return new Response("Error liking review", { status: 500 });
  }
};
