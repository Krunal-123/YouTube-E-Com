import React from 'react';
import { ListItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../src/context/CartContext';

const MobileMenu = () => {
  const navigate = useNavigate();
  const { LightMode } = useCart()
  return (
    <div className={`flex justify-around items-center ${LightMode ? "bg-slate-950 text-white" : "bg-white text-dark"} shadow-md fixed bottom-0 left-0 right-0 z-50 px-2 py-0 md:hidden`}>
      <ListItem onClick={() => navigate('/home')} className="flex flex-col items-center transition ease-in-out active:scale-90 cursor-pointer">
        <HomeIcon className="text-blue-600" />
        <p className='text-sm font-bold'>Home</p>
      </ListItem>

      <ListItem onClick={() => navigate('/contactus')} className="flex flex-col items-center transition ease-in-out active:scale-90 cursor-pointer">
        <ContactMailIcon className="text-red-600 text-sm" />
        <p>Contact Us</p>
      </ListItem>

      <ListItem onClick={() => navigate('/aboutus')} className="flex flex-col items-center transition ease-in-out active:scale-90 cursor-pointer">
        <InfoIcon />
        <p>About Us</p>
      </ListItem>
    </div>
  );
};

export default MobileMenu;
