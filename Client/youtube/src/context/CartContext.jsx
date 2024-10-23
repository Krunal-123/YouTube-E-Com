import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// Create the Cart context
const CartContext = createContext();
// Create a provider component
export const CartProvider = ({ children }) => {
  // navigate
  const Navigate = useNavigate()
  // Header badges update here
  const [cartItems, setCartItems] = useState(0); // Initialize with a default value of 0
  const [fav, setFav] = useState(0)
  // open for the review modal
  const [open, setOpen] = useState(false)
  // Services products
  const [services, setServices] = useState([]);
  // USER data
  const [user, setUser] = useState();
  // review added
  const [add, setAdd] = useState(0)
  // isExploding
  const [isExploding, setIsExploding] = useState(false);
  // light mode
  const [LightMode, setLightMode] = useState()
  // before purchase items lenght
  const [LengthCart, setLengthCart] = useState([])

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // user[0]?.myfavourite.length
  // Fetch services and user data
  const fetchData = async () => {
    try {
      // Fetch services data
      const { data: servicesData } = await axios.post("http://localhost:3000/services");
      // console.log(servicesData);
      let Status = [...servicesData].slice(0, 3).map(p => ({ ...p, status: "New", color: "primary" }))
      let Status2 = [...servicesData].slice(3, 6).map(p => ({ ...p, status: "Trending🔥", color: "warning" }))
      servicesData.splice(0, 6, ...Status.concat(Status2))
      setServices(servicesData);

      // Check if cookies and token are defined before making API requests
      if (cookies && cookies.token != undefined) {
        const userResponse = await axios.post("http://localhost:3000/addcart/user", { cookies });
        // Ensure that userResponse and its properties are defined before accessing them
        if (userResponse.data && userResponse.data[0] && userResponse.data[0].addcart) {
          setUser(userResponse.data);
          setFav(userResponse.data[0].myfavourites.length);
          setCartItems(userResponse.data[0].addcart.length);
          // setLength(userResponse[0].myitems.length)
        }
      } else {
        Navigate("/login")
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Additional error handling can be implemented here if needed
    }
  };

  useEffect(() => {
    fetchData();
    console.log("check");
  }, [cookies, cartItems, fav, add]); // Removed cartItems from dependency to avoid infinite loop

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, services, setServices, user, setUser, cookies, removeCookie, fav, setFav, open, setOpen, setAdd, isExploding, setIsExploding, LightMode, setLightMode, LengthCart, setLengthCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
