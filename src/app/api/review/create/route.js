import Review from '@/lib/models/review.model.js';
import { connect } from '@/lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
    const user = await currentUser();
    try {
      await connect();
      const data = await req.json();
      console.log('Received data in /api/review/create:', data);
  
      if (!user || user.publicMetadata.userMongoId !== data.userMongoId) {
        console.log('Clerk user object:', user);
        console.log('Data for auth check - userMongoId:', data.userMongoId);        return new Response('Unauthorized', {
          status: 401,
        });
      }
      const newReview = await Review.create({
        albumId: data.albumId,
        user: data.userMongoId,
        name: data.name,
        username: data.username,
        text: data.text,
        profileImg: data.profileImg,
      });
      await newReview.save();
      return new Response(JSON.stringify(newReview), {
        status: 200,
      });
    } catch (error) {
      console.log('Error creating review:', error);
      return new Response('Error creating review', {
        status: 500,
      });
    }
  };