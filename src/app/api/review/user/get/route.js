import Review from '@/lib/models/review.model';
import { connect } from '@/lib/mongodb/mongoose';

export const POST = async (req) => {
  try {
    await connect();
    
    const data = await req.json();
    const reviews = await Review.find({ data }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(reviews), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to fetch the review data', { status: 500 });
  }
};