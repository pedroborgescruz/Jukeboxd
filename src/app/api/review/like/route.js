import Review from '@/lib/models/review.model';
import { connect } from '@/lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async (req) => {
  const user = await currentUser();
  try {
    await connect();
    const data = await req.json();
    if (!user) {
      return { status: 401, body: 'Unauthorized' };
    }
    const post = await Review.findById(data.postId);
    if (post.likes.includes(user.publicMetadata.userMongoId)) {
      const updatedReview = await Review.findByIdAndUpdate(
        data.postId,
        { $pull: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedReview), { status: 200 });
    } else {
      const updatedReview = await Review.findByIdAndUpdate(
        data.postId,
        { $addToSet: { likes: user.publicMetadata.userMongoId } },
        { new: true }
      );
      return new Response(JSON.stringify(updatedReview), { status: 200 });
    }
  } catch (error) {
    console.log('Error liking review:', error);
    return new Response('Error liking review', { status: 500 });
  }
};