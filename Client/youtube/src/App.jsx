import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import HomePage from './HomePage.jsx';

const About = lazy(() => import('./Aboutus.jsx'));
const Contact = lazy(() => import('./Contactus.jsx'));
const Services = lazy(() => import('./Services.jsx'));
const DetailCard = lazy(() => import('./DeatilCard.jsx'));
const Addcart = lazy(() => import('./Addcart.jsx'));
const Mypurchase = lazy(() => import('./Mypurchase.jsx'));
const Myprofile = lazy(() => import('./Myprofile.jsx'));
const ForgotPassword = lazy(() => import('./ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./ResetPassword.jsx'));
const Myfavourites = lazy(() => import('./Myfavourites.jsx'));
const OrderHistory = lazy(() => import('./OrderHistory.jsx'));
const ErrorPage = lazy(() => import('../components/ErrorPage.jsx'));

function App() {
  const router = createBrowserRouter(
    [
      {
        future: {
          v7_relativeSplatPaths: true, // Enable future behavior
        },
      },
      {
        path: '/',
        element: <HomePage />,
        children: [
          { path: 'home', element: <Services /> },
          { path: 'myprofile', element: <Myprofile /> },
          { path: 'mypurchase', element: <Mypurchase /> },
          { path: 'aboutus', element: <About /> },
          { path: 'services/:id', element: <DetailCard /> },
          { path: 'addcart', element: <Addcart /> },
          { path: 'contactus', element: <Contact /> },
          { path: 'myfavourites', element: <Myfavourites /> },
          { path: 'orderhistory', element: <OrderHistory /> },
        ],
      },
      { path: '/login', element: <Login /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password/:email', element: <ResetPassword /> },
      { path: '/signup', element: <Signup /> },
      { path: '*', element: <ErrorPage /> },
    ],
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
