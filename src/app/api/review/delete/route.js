import Review from '@/lib/models/review.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const DELETE = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }
    await Review.findByIdAndDelete(data.reviewId);
    return new Response('Review deleted', { status: 200 });
  } catch (error) {
    console.log('Error deleting review:', error);
    return new Response('Error deleting review', { status: 500 });
  }
};