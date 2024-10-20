import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { Button, Spinner } from 'react-bootstrap';
import { FaRegHeart } from 'react-icons/fa'; // Importing the heart icon
import { toast } from 'react-toastify';
import { useCart } from '../src/context/CartContext';

export default function ({ id, img, title, description, btn, email, status, color }) {
  const { user, setFav, LightMode } = useCart();
  const [isFavorited, setIsFavorited] = useState(); // State to track if the item is favorited

  // useEffect to update the favorite state based on user data
  useEffect(() => {
    if (user) {
      const check = user[0]?.myfavourites.some((d) => d._id == id);
      setIsFavorited(check);
    }
  }, [user, id]);

  // Function to handle favorite icon click
  const handleFavoriteClick = async (event) => {
    event.preventDefault() // Prevent the Link from triggering
    if (!isFavorited) {
      try {
        let res = await axios.post("http://localhost:3000/addfavourite", { email, id });
        if (res.data === 'save') {
          toast.success('Add into Your Favorites List!😍', {
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFav((p) => p + 1)
          setIsFavorited(true); // Update the state if successfully added to favorites
        } else {
          throw new Error('Failed to add');
        }
      } catch (error) {
        toast.error('An error occurred while adding to favorites', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      await axios.post("http://localhost:3000/addfavourite/delete", { email, id });
      toast.error('Remove from the Favourite List', {
        position: "top-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFav((p) => p - 1)
      setIsFavorited(false); // Update the state if successfully added to favorites
    }
  };

  // Display a loading spinner if the user data is not available
  if (!user) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className={`border-0 w-[350px] h-[500px] m-auto transition duration-500 ease-in-out hover:scale-105 shadow-2xl ${LightMode ? "hover:shadow-[0_0px_40px_4px_rgba(0,255,255,1)]" : "hover:shadow-[0_0px_40px_1px_rgba(0,0,0,1)]"} ${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-gray-700"} relative rounded-xl`}>

      {/* Favorite Icon */}
      <FaRegHeart
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: isFavorited ? '#ff0055' : '#262626',
        }}
        className='text-3xl m-3 cursor-pointer transition-transform duration-200 hover:scale-[1.2]'
        onClick={handleFavoriteClick}
      />
      <Link to={`/services/${id}`}>
        {<Badge bg={color} className='absolute top-[-13px] left-[15px] text-sm font-extrabold'>{status}</Badge>}
        <Card.Img variant="top" src={img && img} className='h-[300px] object-fill' />
        <Card.Body className='p-4'>
          <Card.Title className='bg-clip-text text-xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-yellow-400' >{title && title}</Card.Title>
          <Card.Text>{description && description.slice(0, 150) + '...'}<span className='text-blue-600 text-xl font-bold hover:underline'>(More)</span></Card.Text>
          {btn && <Button className='bg-blue-500 text-white mt-2'>Continue</Button>}
        </Card.Body>
      </Link>
    </Card>
  );
}
