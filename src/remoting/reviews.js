import Review from "@/lib/models/review.model";
import { connect } from "@/lib/mongodb/mongoose";

export async function getAllReviews() {
  try {
    await connect();
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getUserReviews(userId) {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/review/user/get",
      {
        method: "POST",
        body: JSON.stringify({ user: userId }),
        cache: "no-store",
      }
    );
    return await result.json();
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    return null;
  }
}

export async function createReview(payload) {
  return fetch("/api/review/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function likeReview(postId) {
  return fetch("/api/review/like", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });
}

export async function deleteReview(reviewId) {
  return fetch("/api/review/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reviewId }),
  });
}
