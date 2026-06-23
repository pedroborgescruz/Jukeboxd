import prisma from "@/lib/prisma";

export class ReviewService {
  /**
     * Fetch reviews across the platform, optionally filtered by a specific album.
     */
  static async getAllReviews(albumId = null) {
    try {
      // Build out dynamic query constraints
      const queryOptions = {
        orderBy: {
          createdAt: "desc",
        },
      };

      // If an albumId is supplied, explicitly filter the PostgreSQL rows
      if (albumId) {
        queryOptions.where = {
          albumId: albumId,
        };
      }

      const reviews = await prisma.review.findMany(queryOptions);

      return reviews.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt?.toISOString() || null,
      }));
    } catch (error) {
      console.error("ReviewService.getAllReviews failed:", error);
      return [];
    }
  }

  /**
   * Fetch all reviews authored by a specific user.
   */
  static async getUserReviews(userId) {
    try {
      if (!userId) return [];
      const userReviews = await prisma.review.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
      });

      return userReviews.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt?.toISOString() || null,
      }));
    } catch (error) {
      console.error(`ReviewService.getUserReviews failed for user ${userId}:`, error);
      return [];
    }
  }
}

// --- CLIENT-SIDE FETCHER EXPORTS ---
// Your UI components (input.js, icons.js) are looking for these exact functions here:

/**
 * Sends a POST request to create a new review.
 */
export async function createReview(payload) {
  return fetch("/api/review/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Sends a PUT request to toggle a like on a review.
 */
export async function likeReview(postId) {
  return fetch("/api/review/like", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });
}

/**
 * Sends a DELETE request to remove a review.
 */
export async function deleteReview(reviewId) {
  return fetch("/api/review/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewId }),
  });
}
