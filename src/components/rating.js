import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function HalfRating() {
  const num = Math.floor(Math.random() * 6);

  return (
    <Rating 
    name="size-small" 
    defaultValue={0}
    size="small"
    precision={0.5}
    style={{ color: '#cbf203' }} 
    sx={{
      '& .MuiRating-iconEmpty': {
        color: '#ded4df', // For unfilled stars
      },
    }}
    />
  );
}
