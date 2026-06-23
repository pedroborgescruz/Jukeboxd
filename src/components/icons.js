'use client';

import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { likeReview, deleteReview } from '@/remoting/reviews';

export default function Icons({ review, onCommentClick }) {
  // FIXED: Ensure fallbacks check for 'id' instead of '_id'
  const [likes, setLikes] = useState(review.likes || []);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Resolve user identifier cleanly
  const currentUserId = user?.publicMetadata?.userMongoId || user?.id;

  const likePost = async () => {
    if (!user) {
      return router.push('/sign-in');
    }

    // FIXED: Swapped review._id for your Postgres review.id
    const res = await likeReview(review.id);

    if (res.ok) {
      setLikes((prev) =>
        isLiked 
          ? prev.filter((id) => id !== currentUserId) 
          : [...prev, currentUserId]
      );
    }
  };

  useEffect(() => {
    if (currentUserId) {
      setIsLiked(likes.includes(currentUserId));
    }
  }, [likes, currentUserId]);

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      // FIXED: Swapped review.user to review.userId to align with your Postgres schema
      if (currentUserId === review.userId) {
        // FIXED: Swapped review._id for your Postgres review.id
        const res = await deleteReview(review.id);

        if (res.status === 200) {
          // UPGRADED: Replaced full window reload with clean Next.js state update
          router.refresh();
        } else {
          alert('Error deleting review');
        }
      }
    }
  };

  return (
    <div className='flex justify-end gap-2 text-gray-500'>

      {/* Like Button */}
      <div className='flex items-center'>
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full p-2 text-white transition duration-200 ease-in-out hover:text-red-500'
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full p-2 transition duration-500 ease-in-out hover:text-red-500'
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && 'text-white'}`}>
            {likes.length}
          </span>
        )}
      </div>

      {/* Delete Button */}
      {/* FIXED: Comparing against review.userId instead of review.user */}
      {currentUserId === review.userId && (
        <HiOutlineTrash
          onClick={deletePost}
          className='h-8 w-8 cursor-pointer rounded-full p-2 transition duration-500 ease-in-out hover:text-red-500'
        />
      )}
    </div>
  );
}
