import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


export default function HalfRating() {
  return (
    <Rating
      name="half-rating"
      defaultValue={2.5}
      precision={0.5}
      style={{ color: '#facc15' }} // Tailwind's yellow-400
    />
  );
}
