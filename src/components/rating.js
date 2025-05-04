import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function HalfRating({
  size = 'large',              // default size
  filledColor = '#c9f105',     // default filled star color
  defaultValue = 0,
}) {

  return (
    <Rating 
      name="custom-rating" 
      defaultValue={defaultValue}
      size={size}
      precision={0.5}
      style={{ color: filledColor }} 
      sx={{
        '& .MuiRating-iconEmpty': {
          color: '#ded4df',
        },
      }}
    />
  );
}
