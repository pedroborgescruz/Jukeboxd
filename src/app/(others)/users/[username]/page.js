import FollowButton from '@/components/followButton';
import AlbumGridBox from '@/components/albumGridBox';

export default async function UserPage({ params }) {
  let data = null;
  // Fetch user data
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/get', {
      method: 'POST',
      body: JSON.stringify({ username: params.username }),
      cache: 'no-store',
    });
    data = await result.json();
    const userReviews = await fetch(process.env.NEXT_PUBLIC_URL + '/api/review/user/get', {
      method: 'POST',
      body: JSON.stringify({ userId: data._id }),
      cache: 'no-store',
    });
    data.posts = await userReviews.json();
  } catch (error) {
    console.error('Failed to fetch post', error);
  }
  
return (
  <div className='p-3 max-w-5xl mx-auto min-h-screen text-white'>
    {!data && <h2 className='text-center mt-5 text-lg'>User not found</h2>}

    {data && (
      <>
        {/* Profile Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-700 flex-wrap'>
          {/* Left Side: Avatar + Info */}
          <div className='flex items-center space-x-4'>
            <img
              src={data.avatar}
              alt='Profile'
              className='h-20 w-20 rounded-full border border-gray-500'
            />
            <div>
              <h2 className='text-2xl font-bold'>{data.firstName + ' ' + data.lastName}</h2>
              <p className='text-sm mt-1 text-gray-300'>This is my short little bio.</p>
            </div>
          </div>

          {/* Right Side: Stats */}
          <div className='flex space-x-6 text-gray-300 mt-4 sm:mt-0'>
            <div className='text-center'>
              <span className='block font-semibold text-white'>{data.following.length}</span>
              <span className='text-sm'>Mixtapes</span>
            </div>
            <div className='text-center'>
              <span className='block font-semibold text-white'>{data.following.length}</span>
              <span className='text-sm'>Albums</span>
            </div>
            <div className='text-center'>
              <span className='block font-semibold text-white'>{data.following.length}</span>
              <span className='text-sm'>Reviews</span>
            </div>
            <div className='text-center'>
              <span className='block font-semibold text-white'>{data.following.length}</span>
              <span className='text-sm'>Following</span>
            </div>
            <div className='text-center'>
              <span className='block font-semibold text-white'>{data.followers.length}</span>
              <span className='text-sm'>Followers</span>
            </div>
          </div>
          <div className='p-6'>
            <FollowButton user={data} />
          </div>
        </div>

        {/* Favorite Albums Section */}
        <div className='p-6'>
          <h3 className='text-xl font-semibold mb-4'>My Favorite Albums</h3>
            <AlbumGridBox title='My Favorite Albums' albums={data.favoriteAlbums} />
        </div>
      </>
    )}
  </div>
);

}