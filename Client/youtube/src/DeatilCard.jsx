import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, CircularProgress, Grid, Box, Modal, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useCart } from './context/CartContext'; // Adjust the import path as necessary
import 'react-toastify/dist/ReactToastify.css';
import ReviewPage from './Review';
import WriteReviewPage from './CreateReview';
import { Toast } from '../components/SuccessToast';
import { errorToast } from '../components/ErrorToast';

function BasicExample() {
    const { services, user, setCartItems, open, setOpen, LightMode } = useCart(); // Access services, user, and setCartItems from context
    const { id } = useParams(); // Get the id from the URL parameters
    const [cookies] = useCookies(); // Use cookies for user authentication
    const [btn, setBtn] = useState(false); // State to control the add to cart button
    const [purchased, setPurchased] = useState(false); // State to check if product is purchased
    const [Data, setData] = useState(null); // State to hold filtered service data

    useEffect(() => {
        if (services && user) {
            const filteredData = services.find((p) => p._id === id);
            setData(filteredData); // Set the filtered data to local state
            const isPurchased = user[0]?.myitems?.some((v) => v._id === id);
            const isAddedToCart = user[0]?.addcart?.some((v) => v._id === id);
            setPurchased(isPurchased);
            setBtn(isPurchased || isAddedToCart);
        }
    }, [services, user, id, cookies]);

    const Addcart = async () => {
        try {
            await axios.post('http://localhost:3000/addcart', { id, cookies });
            setBtn(true);
            setCartItems((prevCount) => prevCount + 1);
            Toast('Add into your Cart', 1300)
        } catch (error) {
            console.error('Error adding to cart:', error);
            errorToast('Failed to add to cart', 1300)
        }
    };

    const OrderModal = styled(Modal)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const ModalContent = styled(Box)(({ theme }) => ({
        width: '80%',
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
    }));

    if (!Data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Container sx={{ my: 8 }} className={`text-${LightMode ? "white" : "dark"}`}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={Data.img} alt={Data.title} sx={{ height: "550px", width: '100%', borderRadius: 2 }} className='shadow-xl' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h4" component="h2" gutterBottom>
                                <span className='font-bold'>{Data.title}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {Data.description}
                            </Typography>
                            <Box >
                                {Data.key && Data.key.map((d, i) => (
                                    <Box key={i} mb={2}>
                                        <Typography variant="h6">{d.title}</Typography>
                                        <ul>
                                            {d.info.map((a, j) => (
                                                <li key={j}>
                                                    <Typography variant="body2">{a}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                ))}
                            </Box>
                            <Typography variant="h5" gutterBottom>
                                <s>₹{Math.floor(Data.price).toLocaleString('en-IN')}</s> <span className='text-red-500'>₹{Math.floor(Data.price / 2).toLocaleString('en-IN')}</span> (50% OFF)
                            </Typography>
                            <Button
                                onClick={Addcart}
                                variant="contained"
                                color={btn ? 'secondary' : 'primary'}
                                disabled={btn}
                                sx={{ mt: 3, py: 1, px: 3 }}
                            >
                            <span className={`text-${LightMode?"slate-50":"gray-500"} flex text-lg`}>
                                <FaShoppingCart className='mt-1'/>
                                <span className='ml-2'>
                                {purchased ? 'Purchased Already' : btn ? 'Added to Cart' : 'Add to Cart'}
                                </span>
                            </span>
                            </Button>
                            {purchased && (
                                <Box mt={2}>
                                    <Button variant="text" color="primary" className='text-2xl' onClick={() => setOpen(true)}>
                                        Write Review
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {Data.reviews && <ReviewPage data={Data.reviews} user={user}/>}

            <OrderModal open={open} onClose={() => setOpen(false)}>
                <ModalContent>
                    <WriteReviewPage id={id} />
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </Box>
                </ModalContent>
            </OrderModal>
        </>
    );
}

export default BasicExample;
