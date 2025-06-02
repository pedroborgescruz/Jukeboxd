"use client";

import { useUser } from "@clerk/nextjs";
import { useRef, useState, useEffect } from 'react';

export default function Input({album_id}) {
    const { user, isSignedIn, isLoaded } = useUser();
    const [text, setText] = useState('');
    const [postLoading, setPostLoading] = useState(false);

    // When post button is hit, create post and reload current screen.
    const handleSubmit = async () => {

        setPostLoading(true);
        
        const response = await fetch('/api/review/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            albumId: album_id,
            userMongoId: user.publicMetadata.userMongoId,
            name: user.fullName,
            username: user.username,
            text,
            profileImg: user.imageUrl,
          }),
        });
        setPostLoading(false);
        setText('');
        location.reload();
    };

    // If no user currently signed in, don't display user input.
    if (!isSignedIn || !isLoaded) {
        return null;
    }

    return (
        <div className='flex border-b border-[#441c4c] p-3 mb-5 space-x-3 w-160'>
            <img
            src={user.imageUrl}
            alt='user-img'
            className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95 object-cover'/>
            <div className='w-full divide-y divide-gray-200'>
                <textarea
                className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-500 '
                placeholder='Leave your review here...'
                rows='2'
                value={text}
                onChange={(e) => setText(e.target.value)}></textarea>
            </div>
            <div className='flex items-center justify-between ml-3 pt-2.5'>
                <button
                disabled={text.trim() === '' || postLoading}
                className='bg-primary text-white px-4 py-1.5 rounded-full shadow-md hover:brightness-95 disabled:opacity-50'
                onClick={handleSubmit}>
                    Post
                </button>
            </div>           
        </div>
    );
}