'use client';

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Icons({ review, onCommentClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(review.likes || []);
  const { user } = useUser();
  const router = useRouter();

  const likePost = async () => {
    if (!user) {
      return router.push('/sign-in');
    }

    const res = await fetch('/api/review/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: review._id }),
    });

    if (res.ok) {
      const userId = user.publicMetadata.userMongoId;
      setLikes((prev) =>
        isLiked ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    }
  };

  useEffect(() => {
    if (user) {
      setIsLiked(likes.includes(user.publicMetadata.userMongoId));
    }
  }, [likes, user]);

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      if (user?.publicMetadata.userMongoId === review.user) {
        const res = await fetch('/api/review/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reviewId: review._id }),
        });

        if (res.status === 200) {
          location.reload();
        } else {
          alert('Error deleting review');
        }
      }
    }
  };

  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
      {/* Comment */}
      <div className='flex items-center'>
        <HiOutlineChat
          className='h-8 w-8 cursor-pointer rounded-full p-2 transition duration-500 ease-in-out hover:text-sky-500 hover:bg-sky-100'
          onClick={() => {
            if (!user) {
              router.push('/sign-in');
            } else if (typeof onCommentClick === 'function') {
              onCommentClick(review._id);
            }
          }}
        />
        {review.comments.length > 0 && (
          <span className='text-xs'>{review.comments.length}</span>
        )}
      </div>

      {/* Like */}
      <div className='flex items-center'>
        {isLiked ? (
          <HiHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full p-2 text-red-600 transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100'
          />
        ) : (
          <HiOutlineHeart
            onClick={likePost}
            className='h-8 w-8 cursor-pointer rounded-full p-2 transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100'
          />
        )}
        {likes.length > 0 && (
          <span className={`text-xs ${isLiked && 'text-red-600'}`}>
            {likes.length}
          </span>
        )}
      </div>

      {/* Delete */}
      {user?.publicMetadata.userMongoId === review.user && (
        <HiOutlineTrash
          onClick={deletePost}
          className='h-8 w-8 cursor-pointer rounded-full p-2 transition duration-500 ease-in-out hover:text-red-500 hover:bg-red-100'
        />
      )}
    </div>
  );
}
