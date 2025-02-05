import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Rating, Card, CardContent } from '@mui/material';
import { useCart } from './context/CartContext';
import axios from 'axios';
import { Toast } from '../components/SuccessToast';

export default function WriteReviewPage({ id }) {
  const { user, setOpen, setAdd } = useCart()
  const [reviewData, setReviewData] = useState({
    id: `${id}`,
    profilePic: `${user[0].profilePic}`,
    name: `${user[0].firstName} ${user[0].lastName}`,
    review: '',
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData((prevData) => ({
      ...prevData,
      rating: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can send the data to a backend or display it in the app.
    await axios.post("https://youtube-e-com-backend.onrender.com/review", { reviewData }).then((r) => {
      setOpen(false)
      Toast('Review Submitted', 1000)
      setAdd(p => p + 1)
    })
  };
  if (!user) {
    return
  }
  return (
    <div className='p-5 w-100 m-auto text-center border-0'>
      <Typography variant="h4" gutterBottom>
        Write a Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Your Name (Read only)" name="name" value={reviewData.name} onChange={handleInputChange} margin="normal" disabled />
        <TextField fullWidth label="Your Review" name="review" value={reviewData.review} onChange={handleInputChange} margin="normal" required multiline rows={4} />
        <Box marginY={2}>
          <Typography component="legend">Rating</Typography>
          <Rating name="rating" value={reviewData.rating} onChange={handleRatingChange} size='large' />
          <Typography component="legend">Out of 5</Typography>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit Review
        </Button>
      </form>
    </div>
  );
}
