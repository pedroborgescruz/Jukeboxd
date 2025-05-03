"use client";
import { useUser } from "@clerk/nextjs";
import { useRef, useState, useEffect } from 'react';

export default function Input() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [text, setText] = useState('');

    if (!isSignedIn || !isLoaded) {
        return null;
    }

    return (
        <div className='flex border-b border-gray-700 p-3 mb-5 space-x-3 w-160'>
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
                className='bg-primary text-white px-4 py-1.5 rounded-full shadow-md hover:brightness-95 disabled:opacity-50'>
                    Review
                </button>
            </div>           
        </div>
    );
}