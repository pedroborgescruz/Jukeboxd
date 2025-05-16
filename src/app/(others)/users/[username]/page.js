import FollowButton from '@/components/followButton';
import AlbumGridBox from '@/components/albumGridBox';

export default async function UserPage({ params }) {

  let data = null;

  try {
    // Fetch user data
    const result = await fetch(process.env.NEXT_PUBLIC_URL + '/api/user/get', {
      method: 'POST',
      body: JSON.stringify({ username: params.username }),
      cache: 'no-store',
    });
    data = await result.json();

    // Fetch user reviews
    const userReviews = await fetch(process.env.NEXT_PUBLIC_URL + '/api/review/user/get', {
      method: 'POST',
      body: JSON.stringify({ userId: data._id }),
      cache: 'no-store',
    });

    // Assign new property called `reviews` inside the existing data object.
    data.reviews = await userReviews.json();
  } catch (error) {
    console.error('Failed to fetch post', error);
  }
  
  return (
    <div className='p-8 max-w-5xl mx-auto min-h-screen text-white'>
      {!data && <h2 className='text-center mt-5 text-lg'>User not found</h2>}

      {data && (
        // Use CSS Grid for the two-column layout
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'> {/* md:grid-cols-3 creates a 2/3 | 1/3 split on medium screens and up */}

          {/* Left Column - User Profile Details */}
          <div className='md:col-span-2 space-y-6'> {/* Add vertical space between sections */}

            {/* Profile Header */}
            {/* Adjusted padding slightly to fit within the grid column */}
            <div className='flex justify-between items-center pb-6 border-b border-gray-700 flex-wrap'>
              {/* Left Side: Avatar + Info */}
              <div className='flex items-center space-x-4'>
                <img
                  src={data.avatar}
                  alt='Profile'
                  className='h-20 w-20 rounded-full border border-gray-500'
                />
                <div>
                  <h2 className='text-2xl font-bold'>{data.firstName + ' ' + data.lastName}</h2>
                  {/* Assuming a bio field exists in your data */}
                  <p className='text-sm mt-1 text-gray-300'>{data.bio || 'No bio available.'}</p>
                </div>
                {/* Follow Button */}
                {/* <div className='mt-4 sm:mt-0'>
                  <FollowButton user={data} />
                </div> */}
              </div>

              {/* Right Side: Stats */}
              <div className='flex space-x-6 text-gray-300 mt-4 sm:mt-0'>
                <div className='text-center'>
                  <span className='block font-semibold text-white'>{/* data.mixtapes.length or similar */}0</span> {/* Placeholder */}
                  <span className='text-sm'>
                    <a>Library</a></span>
                </div>
                <div className='text-center'>
                  <span className='block font-semibold text-white'>{/* data.reviews.length or similar */}0</span> {/* Placeholder */}
                  <span className='text-sm'>
                    <a>Reviews</a></span>
                </div>
                <div className='text-center'>
                  <span className='block font-semibold text-white'>{data.following?.length || 0}</span> {/* Use optional chaining */}
                  <span className='text-sm'>
                    <a href="#">Following</a></span>
                </div>
                <div className='text-center'>
                  <span className='block font-semibold text-white'>{data.followers?.length || 0}</span> {/* Use optional chaining */}
                  <span className='text-sm'>
                    <a href="#">Followers</a></span>
                </div>
              </div>
            </div>

            {/* Favorite Albums Section */}
            {/* Removed p-6, space-y on parent handles spacing */}
            <div>
              <h3 className='text-xl font-semibold mb-4'>My Favorite Albums</h3>
               {/* Ensure data.favoriteAlbums is the correct data for this component */}
              <AlbumGridBox title='My Favorite Albums' albums={data.favoriteAlbums} />
            </div>

            {/* Recent Ratings Section */}
            <div>
              <h3 className='text-xl font-semibold mb-4'>Recent Ratings</h3>
              <AlbumGridBox title='Recent Ratings' albums={data.recentRatings} />
            </div>

            {/* Recent Reviews Section */}
            <div>
              <h3 className='text-xl font-semibold mb-4'>Recent Reviews</h3>
              <div className='text-gray-300'>
                <div className='border-b border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0'>
                   <p className='font-semibold'>Album Title Here</p>
                   <p className='text-sm text-gray-400'>Rating: X/10</p>
                   <p className='mt-2'>Review text goes here...</p>
                </div>
                {/* Add more reviews */}
                <div>No recent reviews yet.</div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Content (Mimicking Image) */}
          <div className='md:col-span-1 space-y-6'> 
            {/* Around the Web Section */}
            <div className='bg-gray-800 p-4 rounded'>
              <h4 className='text-lg font-semibold mb-3'>Around the Web</h4>
              {/* Placeholder for web links */}
              <div className='text-sm text-gray-300 space-y-2'>
                 {/* Assuming external links are part of your user data */}
                 {data.externalLinks?.spotify && (
                    <p>
                       <span className='font-bold'>Spotify:</span>{' '}
                       <a href={data.externalLinks.spotify} target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline'>
                         {new URL(data.externalLinks.spotify).hostname + (new URL(data.externalLinks.spotify).pathname)} 
                       </a>
                     </p>
                 )}
                 {data.externalLinks?.lastfm && (
                    <p>
                       <span className='font-bold'>Last.fm:</span>{' '}
                       <a href={data.externalLinks.lastfm} target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline'>
                         {new URL(data.externalLinks.lastfm).hostname + (new URL(data.externalLinks.lastfm).pathname)} 
                       </a>
                     </p>
                 )}
                {/* Add more links similarly if available in data */}
                {!data.externalLinks && <p>No external links available.</p>}
              </div>
            </div>

            {/* Rating Distribution Section */}
            <div className='bg-gray-800 p-4 rounded'>
              <h4 className='text-lg font-semibold mb-3'>Rating Distribution</h4>
              <div className='text-sm text-gray-300 space-y-1'>
                {/* Example Structure - Map over actual rating distribution data */}
                 {/* Need total number of ratings to calculate percentage */}
                 {data.ratingDistribution && data.totalRatings > 0 ? (
                   data.ratingDistribution.map((rating) => (
                      <div key={rating.range} className='flex justify-between items-center'>
                         <span>{rating.range}</span>
                         <div className='w-3/4 bg-gray-600 h-3 rounded overflow-hidden'>
                            {/* Calculate width based on count and totalRatings */}
                            <div
                               className={`h-full ${rating.count > 0 ? 'bg-green-500' : 'bg-transparent'}`}
                               style={{ width: `${(rating.count / data.totalRatings) * 100}%` }}
                            ></div>
                         </div>
                         <span>{rating.count}</span>
                      </div>
                   ))
                 ) : (
                   <p>No rating data available.</p>
                 )}
              </div>
              <div className='text-right mt-3'>
                <a href='#' className='text-blue-400 hover:underline text-sm'>ALBUMS <span className='ml-1'>&gt;</span></a>
              </div>
            </div>

            {/* "Become a Donor" section */}
            <div className='bg-green-700 bg-opacity-30 border border-green-600 p-4 rounded flex items-center space-x-3'>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <div>
                 <h5 className='font-semibold text-green-400'>Become a Donor</h5>
                 <p className='text-sm text-green-300'>Donor badge, no ads + more benefits.</p>
               </div>
            </div>

            {/* Placeholder for Ad */}
             <div className='bg-gray-800 h-32 flex items-center justify-center rounded text-gray-500 text-sm'>
               ADVERTISEMENT Placeholder
             </div>

          </div>
        </div>
      )}
    </div>
  );
}