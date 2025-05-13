import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './icons';

export default function Review({review}) {
    return (
     <div className='flex p-3 border-b border-[#441c4c] w-130'>
      <Link href={`/users/${review?.username}`}>
        <img
          src={review?.profileImg}
          alt='user-img'
          className='h-9 w-9 rounded-full mr-4'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {review?.name}
            </h4>
            <span className='text-xs truncate text-gray-400 max-w-32'>@{review?.username}</span>
            {/* add dot space here */}
            <span className='text-xl text-gray-500'>·</span>
            <span className='text-xs text-gray-600 flex-1 truncate max-w-32'>
              {moment(review?.createdAt).fromNow()}
            </span>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>
        <Link href={`/reviews/${review?._id}`}>
          <p className='text-gray-300 text-sm my-3 w-full'>{review?.text}</p>
        </Link>
        <Link href={`/reviews/${review?._id}`}>
          <img src={review?.image} className='rounded-2xl mr-2' />
        </Link>
        <Icons review={review} id={review._id} />
      </div>
    </div>
    )
}