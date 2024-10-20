import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useNavigate } from 'react-router-dom';

const MobileMenu = ({ setCustom }) => {
  let navigate = useNavigate();

  return (
    <div className="flex justify-around items-center bg-white shadow-md fixed bottom-0 left-0 right-0 z-50 p-2 md:hidden">
      <ListItem button onClick={() => navigate('/home')} className="flex flex-col items-center">
        <HomeIcon className="text-blue-600" />
        <ListItemText primary="Home" className="text-sm text-gray-600" />
      </ListItem>


      <ListItem button onClick={() => navigate('/contactus')} className="flex flex-col items-center">
        <ContactMailIcon className="text-red-600" />
        <ListItemText primary="Contact Us" className="text-sm text-gray-600" />
      </ListItem>

      <ListItem button onClick={() => navigate('/aboutus')} className="flex flex-col items-center">
        {/* <CategoryIcon className="text-green-500" /> */}
        <InfoIcon />
        <ListItemText primary="About Us" className="text-sm text-gray-600" />
      </ListItem>
    </div>
  );
};

export default MobileMenu;
