import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Typography, Button, Modal, Divider, Container, CircularProgress, Grid } from '@mui/material';
import { useCart } from '../src/context/CartContext';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',// transform: 'scale(1.02)',
  },
}));

const OrderModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  width: '60%',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const OrderHistory = () => {
  const { user, LightMode } = useCart();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Spinner and empty order handling
  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }
  if (user[0]?.orderhistory.length == 0) {
    return (
      <section className="h-[70vh] bg-[length:600px_100%] bg-no-repeat bg-center bg-[url('https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-1172.jpg?w=740&t=st=1729104729~exp=1729105329~hmac=3f5c66177d02ce2c7ad9572109ff93c6da0095a5a2f87666f2ffe5ea74260bac')]">
        <Container className="py-5">
          <div className="text-center my-40 align-items-center">
            <h5 className='text-red-500 text-7xl mb-5 font-bold d-flex justify-content-center font-mono'>No Order History</h5>
            <Link to={'/home'}>
              <button className='rounded p-2 text-white font-bold text-xl bg-danger hover:opacity-[0.9]'>Continue Browsing</button>
            </Link>
          </div>
        </Container>
      </section>
    )
  }
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Container className={`h-[75vh] mt-5 mb-3 px-5 shadow-xl rounded-4 pt-3 ${LightMode ? "bg-gray-900" : "bg-light"}`} maxWidth={'lg'}>
        <h2 className={`text-3xl text-center font-bold mb-2 text-${LightMode?"white":"dark"}`}>#Order History</h2>
        <div className='h-[80%] w-[100%] overflow-y-auto'>
          {[...user[0]?.orderhistory].reverse().map((order) => (
            <OrderCard key={order._id} className='w-[90%] mx-auto my-3'>
              <CardContent className={`${LightMode ? "bg-dark" : "bg-light"} text-${LightMode?"white":"dark"}`}>
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                  <Box className="flex flex-wrap w-[180px]">
                    {order.id?.map((item) => (
                      <CardMedia
                        component="img"
                        image={item.img}
                        alt={item.img}
                        style={{ width: 80, borderRadius: 4, margin: 5 }}
                        key={item.img}
                      />
                    ))}
                  </Box>
                  <Box className="text-center">
                    <Typography variant="h6">
                      <b>Paid Amount: ₹{order.amount.toLocaleString('en-IN')}</b>
                    </Typography>
                    <Typography variant="body2">
                      Order Date: {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Status: Completed
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Button variant="contained" color="primary" onClick={() => handleOpen(order)}>
                      View Details
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </OrderCard>
          ))}

          {selectedOrder && (
            <OrderModal open={open} onClose={handleClose}>
              <ModalContent className={`${LightMode ? "bg-dark" : "bg-light"} text-${LightMode?"white":"dark"}`}>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Divider />
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    <span className='font-bold text-lg'>Order ID:</span> {selectedOrder._id}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <span className='font-bold text-lg'>Order Date:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <span className='font-bold text-lg'>Status:</span> Completed
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <span className='font-bold text-lg'>Purchase Items:</span> ({selectedOrder.id.length})
                  </Typography>
                  <hr className='py-2' />
                  <Grid container spacing={2} className='overflow-y-auto h-[300px] py-5'>
                    {selectedOrder.id?.map((item) => (
                      <>
                        <Grid item xs={12} key={item._id}>
                          <Box className={`flex justify-between px-5 `} alignItems="center">
                            <CardMedia
                              component="img"
                              image={item.img}
                              alt={item.name}
                              style={{ width: 100, height: 100 }}
                            />
                            <Typography variant="body2">
                              <span className='font-bold'> {item.title}</span>
                            </Typography>
                            <Box>
                              <Typography variant="body2">{item.name}</Typography>
                              <Typography variant="body2" className='line-through'>
                                Price: ₹{item.price.toLocaleString('en-IN')}
                              </Typography>
                              <Typography variant>
                                Paid Price: ₹<span className='text-red-500'>{Math.floor(item.price / 2).toLocaleString('en-IN')}</span>
                              </Typography>
                            </Box>
                            <Typography variant="body2">
                              Items ID: <br /><span className=''> {item._id}</span>
                            </Typography>
                          </Box>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                  <Box mt={2} className="">
                    <hr />
                    <h2 className="my-2  bg-no-repeat bg-cover bg-[url('https://www.psdstamps.com/wp-content/uploads/2022/04/round-youtube-stamp-png.png')]">(Incl All Taxes)</h2>
                    <Typography variant="h6" className='flex justify-start items-center'>
                      Paid Amount: ₹{selectedOrder.amount}
                      <img src='https://www.psdstamps.com/wp-content/uploads/2022/04/round-youtube-stamp-png.png' className='h-[90px] w-[145px] -rotate-12' />
                    </Typography>
                  </Box>
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button variant="contained" color="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Box>
              </ModalContent>
            </OrderModal>
          )}
        </div>
      </Container>
    </>
  );
};

export default OrderHistory;
