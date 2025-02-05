import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, CircularProgress, Grid, Box, Modal, Typography, Divider, styled } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useCart } from './context/CartContext'; // Adjust the import path as necessary
import ReviewPage from './Review';
import WriteReviewPage from './CreateReview';
import { Toast } from '../components/SuccessToast';
import { ErrorToast } from '../components/ErrorToast';
import DisableScrollRestoration from '../components/DisableScrollRestoration';

function BasicExample() {
    const { services, user, setCartItems, open, setOpen, LightMode } = useCart(); // Access services, user, and setCartItems from context
    const { id } = useParams(); // Get the id from the URL parameters
    const [cookies] = useCookies(); // Use cookies for user authentication
    const [btn, setBtn] = useState(false); // State to control the add to cart button
    const [purchased, setPurchased] = useState(false); // State to check if product is purchased
    const [Card, setCard] = useState(null); // State to hold filtered service Card
    const { myitems, addcart } = user[0]

    DisableScrollRestoration()
    useEffect(() => {
        if (services && user) {
            const filteredCard = services.find(({ _id }) => _id === id);
            const isPurchased = myitems?.some(({ _id }) => _id === id);
            const isAddedToCart = addcart?.some(({ _id }) => _id === id);
            setCard(filteredCard); // Set the filtered Card to local state
            setPurchased(isPurchased);
            setBtn(isPurchased || isAddedToCart);
        }
    }, [services, user, id, cookies]);

    const Addcart = async () => {
        try {
            await axios.post('https://youtube-e-com-backend.onrender.com/addcart', { id, cookies });
            setBtn(true);
            Toast('Add into your Cart', 1300)
            setCartItems((prevCount) => prevCount + 1);
        } catch (error) {
            ErrorToast('Failed to add to cart', 1300)
            console.error('Error adding to cart:', error);
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

    if (!Card) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Container sx={{ my: 8 }} className={`text-${LightMode ? "white" : "dark"}`}>
                <button onClick={() => { history.back() }} className='max-md:hidden fixed left-10 bg-transparent text-blue-500 font-bold py-2 px-3 border-2 border-blue-500 rounded hover:cursor-pointer hover:shadow-[0_0px_15px_1px_rgba(0,100,255,0.9)]'><KeyboardBackspaceIcon /><span className='pl-2'>Go Back</span></button>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box component="img" src={Card.img} alt={Card.title} sx={{ height: "550px", width: '100%', borderRadius: 2 }} className='shadow-xl' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h4" component="h2" gutterBottom>
                                <span className='font-bold'>{Card.title}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {Card.description}
                            </Typography>
                            <Box >
                                {Card.key && Card.key.map(({ title, info }, index) => (
                                    <Box key={index} mb={2}>
                                        <Typography variant="h6">{title}</Typography>
                                        <ul>
                                            {info.map((description, i) => (
                                                <li key={i}>
                                                    <Typography variant="body2">{description}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                        <Divider sx={{ my: 2 }} />
                                    </Box>
                                ))}
                            </Box>
                            <Typography variant="h5" gutterBottom>
                                <s>₹{Math.floor(Card.price).toLocaleString('en-IN')}</s> <span className='text-red-500'>₹{Math.floor(Card.price / 2).toLocaleString('en-IN')}</span> (50% OFF)
                            </Typography>
                            <Button
                                onClick={Addcart}
                                variant="contained"
                                color={btn ? 'secondary' : 'primary'}
                                disabled={btn}
                                sx={{ mt: 3, py: 1, px: 3 }}
                            >
                                <span className={`text-${LightMode ? "slate-50" : "gray-500"} flex text-lg`}>
                                    <FaShoppingCart className='mt-1' />
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

            {Card.reviews && <ReviewPage data={Card.reviews} user={user} />}
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
