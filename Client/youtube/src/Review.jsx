import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Rating from '@mui/material/Rating';
import { MDBCardImage } from 'mdb-react-ui-kit';
import { useCart } from './context/CartContext';

export default function ReviewPage({ data, user }) {

  const { LightMode } = useCart()
  const [page, setPage] = useState(1);
  const reviewsPerPage = 3;

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calculate the start and end index for the reviews to be displayed on the current page
  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const displayedReviews = data.slice(startIndex, endIndex);

  return (
    <Container className='my-3 '>
      <h1 className={`text-center text-4xl font-bold mb-3 text-${LightMode ? "white" : "dark"}`}>Customer Reviews</h1>
      {displayedReviews?.map((review, id) => (
        <Card key={id} className={`border-2 border-white  mb-4 bg-${LightMode ? 'dark' : 'light'} ${LightMode ? "text-white" : "text-dark"}`}>
          <CardContent className='leading-8'>
            <Typography variant="body2">
              <i>Date & Time:</i> {new Date(review.createdAt).toLocaleDateString()} | {new Date(review.createdAt).toLocaleTimeString()}
            </Typography>
            <div className='flex my-2'>
              <MDBCardImage
                src={review.profilePic}
                alt="Avatar"
                className="w-[40px] h-[40px] rounded-full me-3"
                fluid
              />
              <Typography variant="h6">{review.name}</Typography>
            </div>
            <Rating name="read-only" value={review.rating} readOnly />
            <Typography variant="body2" className='my-1'><b>Review:</b><br />{review.review}</Typography>
          </CardContent>
        </Card>
      ))}
      {displayedReviews != 0 ? <Stack spacing={2} style={{ marginTop: '20px', alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(data.length / reviewsPerPage)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color='primary'
          size='large'
        />
      </Stack> : (<h2 className={`text-center text-2xl font-semibold mb-3 text-${LightMode?"white":"dark"}`}>No Reviews Yet</h2>)}
    </Container>
  );
}
