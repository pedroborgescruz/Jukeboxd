import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';


export default function HalfRating() {
  return (
    <Rating 
    name="size-small" 
    defaultValue={0}
    size="small"
    style={{ color: '#cbf203' }} // Tailwind's yellow-400
    sx={{
      '& .MuiRating-iconEmpty': {
        color: '#bbb', // Light gray for unfilled stars
      },
    }}
    />
  );
}
