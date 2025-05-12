import Review from './review';

export default function Feed({ data }) {
  return (
    <div>
      {data.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </div>
  );
}