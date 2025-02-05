import * as React from 'react';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from '../src/context/CartContext'
import axios from 'axios';
import CustomizedSwitches from './ModeSwitch';
import ShimmerHeader from '../ShimmerEffect/ShimmerHeader'

export default function PrimarySearchAppBar() {
  const { cartItems, removeCookie, user, fav, setServices, LightMode } = useCart()
  const [custom, setCustom] = React.useState(false)
  const [ProfileHover, setProfileHover] = React.useState(false)
  const menuId = 'primary-search-account-menu';
  let navigate = useNavigate()

  const{firstName,profilePic}=user[0]

  const Categoires = async (categorise) => {
    const { data: servicesData } = await axios.post("https://youtube-e-com-backend.onrender.com/services", { categorise });
    setServices(servicesData);
    navigate("/home")
    window.scrollTo(400, 400)
  }
  const search = async (e) => {
    if (e.key === "Enter") {
      let value = e.currentTarget.value
      const { data: servicesData } = await axios.post("https://youtube-e-com-backend.onrender.com/search", { value });
      setServices(servicesData)
      navigate("/home")
      window.scrollTo(400, 400)
    }
  }

  if (!user) {
    return (
      <ShimmerHeader />
    )
  }


  else {
    return (
      <>
        <div className="flex-grow w-full shadow-2xl sticky-top">
          <div className={`${LightMode ? "bg-gray-950" : "bg-white"} text-${LightMode ? "white" : "dark"}`}>
            <div className="flex items-center px-3 py-2">
              <Link to={'/home'}>
                <img alt="Remy Sharp" src="https://img.icons8.com/?size=100&id=44112&format=png&color=000000" className="w-14 h-14 rounded-full" />
              </Link>
              {/* SEARCH BAR APP */}
              <div className="relative md:hidden ml-1 text-dark">
                <SearchIcon className="absolute left-2 top-2" />
                <input type="text" placeholder="Search...." className="pl-8 py-2 border border-dark rounded-lg w-[130px]" aria-label="search" onKeyDown={search} />
              </div>
              <div className="flex-grow hidden md:flex ml-4">
                <Link to="/home">
                  <button className="my-2 block mx-2 bg-clip-text text-lg font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Home</button>
                </Link>
                {/* Categories */}
                <div onMouseEnter={() => setCustom(true)} onMouseLeave={() => setCustom(false)}>
                  <button className="my-2  block mx-2 bg-clip-text text-lg font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Categoires</button>
                </div>
                {/* Categories Menu */}
                <div className={`absolute z-50 mt-1 left-[120px] top-[50px] bg-${LightMode ? "dark" : "white"} border border-gray-300 rounded-md shadow-lg ${custom ? 'block' : 'hidden'}`} onMouseEnter={() => setCustom(true)} onMouseLeave={() => setCustom(false)}>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("editing")}>Editing Services</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("SEO")}>SEO Services</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("production")}>Production Services</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("designing")}>Designing Services</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("manager")}>Youtube Manager</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("scripting")}>Video Scripting</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("analytics")}>Analytics and Reporting</button>
                  <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("promotions")}>Social Media Promotions</button>
                  <hr />
                  <button className="w-[80%] text-center py-2 px-2 mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("all")}>Explore All</button>
                </div>
                <Link to="/aboutus">
                  <button className="my-2  block mx-2 bg-clip-text text-lg font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">About Us</button>
                </Link>
                <Link to="/contactus">
                  <button className="my-2  block mx-2 bg-clip-text text-lg font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Contact Us</button>
                </Link>
              </div>
              <div className="flex-grow" />
              <div className="hidden md:flex items-center">
                {/* Toggle Mode */}
                <CustomizedSwitches />
                {/* SEARCH BAR */}
                <div className="relative mr-2">
                  <SearchIcon className="absolute left-2 top-2" />
                  <input type="text" placeholder="Search...." className={`pl-10 pr-4 py-2 border border-bg-${LightMode ? "dark" : "white"} rounded-lg bg-${LightMode ? "dark" : "white"}`} aria-label="search" onKeyDown={search} />
                </div>

                {/*///// DIVISION ///*/}
                {/* ##-USER NAME-## */}
                <div className="m-2 font-bold rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px]">
                  <div className={`h-full w-full bg-${LightMode ? "dark" : "white"} rounded-sm p-1`}>
                    <i className='bg-clip-text text-lg font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                      HELLO, {firstName.toUpperCase()}
                    </i>
                  </div>
                </div>
                {/* PROFILE IMG */}
                <button aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
                  <img src={profilePic} className={`w-[35px] h-[35px] rounded-full m-2 ${ProfileHover && "shadow-[0px_0px_10px_5px_rgba(210,255,0,1)]"}`} />
                </button>
                {/* Menu */}
                <div className={`absolute z-50 px-2 right-[60px] top-[62px] bg-${LightMode ? "dark" : "white"} border border-gray-300 rounded-md shadow-lg ${ProfileHover ? 'block' : 'hidden'}`} onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)}>
                  <Link to={'/myprofile'}>
                    <div className="py-2 px-2 block bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Profile</div>
                  </Link>
                  <Link to={'/mypurchase'}>
                    <div className="py-2 px-2 block bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Purchase</div>
                  </Link>
                  <Link to={'/orderhistory'}>
                    <div className="py-2 px-2 block bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Order</div>
                  </Link>
                  <hr />
                  <div className="py-2 px-2 block bg-clip-text text-md cursor-pointer font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500" onClick={() => { removeCookie('token') }}>Logout</div>
                </div>
                {/* FAV ICON */}
                <Link to={'/myfavourites'}>
                  <button className="text-xl ml-2 mx-2">
                    <Badge badgeContent={fav} color="error">
                      <FavoriteBorderIcon />
                    </Badge>
                  </button>
                </Link>
                {/* ADDCART ICON */}
                <Link to={"/addcart"}>
                  <button className="text-2xl mx-2 me-3 mb-1">
                    <Badge badgeContent={cartItems} color="error">
                      <AiOutlineShoppingCart />
                    </Badge>
                  </button>
                </Link>
              </div>

              {/* modile app render */}
              <div className="flex">
                <div className='md:hidden'>
                  {/* PROFILE IMG APP */}
                  <button
                    onClick={() => setProfileHover((previous) => !previous)}
                  >
                    <img src={profilePic} className={`d-inline w-[35px] h-[35px] mb-2 rounded-full ${ProfileHover && "shadow-[0px_0px_10px_5px_rgba(210,255,0,1)]"}`} />
                  </button>

                  {/* Menu */}
                  <div
                    className={`absolute z-50 right-[70px] top-[60px] bg-${LightMode ? "dark" : "white"} border border-gray-300 rounded-md shadow-lg ${ProfileHover ? 'block' : 'hidden'} border border-gray-300 rounded-md shadow-lg ${ProfileHover ? 'block' : 'hidden'}`}
                  >
                    <div className="py-2 px-2 block mx-2 bg-clip-text text-lg font-bold text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Hi, {firstName.toUpperCase()}
                    </div>
                    <div>
                      {/* Toggle Mode */}
                      <span className="py-1 px-2 mx-1 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                        DarkMode
                      </span>
                      <CustomizedSwitches />
                    </div>
                    <Link to={'/myprofile'} onClick={() => setProfileHover(false)}>
                      <div className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Profile</div>
                    </Link>
                    <Link to={'/mypurchase'} onClick={() => setProfileHover(false)}>
                      <div className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Purchase</div>
                    </Link>
                    <Link to={'/orderhistory'} onClick={() => setProfileHover(false)}>
                      <div className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500">My Order</div>
                    </Link>
                    <hr />
                    <div className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-blue-500 to-purple-500" onClick={() => { removeCookie('token') }}>Logout</div>
                  </div>


                  {/* FAV ICON APP*/}
                  <Link to={'/myfavourites'}>
                    <button className=" mx-2">
                      <Badge badgeContent={fav} color="error">
                        <FavoriteBorderIcon />
                      </Badge>
                    </button>
                  </Link>


                  {/* ADDCART ICON APP*/}
                  <Link to={"/addcart"}>
                    <button className="text-2xl mx-2 me-3">
                      <Badge badgeContent={cartItems} color="error">
                        <AiOutlineShoppingCart />
                      </Badge>
                    </button>
                  </Link>

                  {/* Catogories  APP*/}
                  <button
                    onClick={() => setCustom((previous) => !previous)}
                  >
                    <MoreIcon />
                  </button>

                  {/* Categories Menu APP*/}
                  <div
                    className={`absolute z-50 mt-1 right-[0px] top-[50px] ${LightMode ? "text-white" : "text-dark"} ${LightMode ? "bg-dark" : "bg-white"} border border-gray-300 rounded-md shadow-lg ${custom ? 'block' : 'hidden'}`}
                    onClick={() => setCustom(false)}
                  >
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("editing")}>Editing Services</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("SEO")}>SEO Services</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("production")}>Production Services</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("designing")}>Designing Services</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("manager")}>Youtube Manager</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("scripting")}>Video Scripting</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("analytics")}>Analytics and Reporting</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("promotions")}>Social Media Promotions</button>
                    <button className="py-2 px-2 block mx-2 bg-clip-text text-md font-bold hover:text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={() => Categoires("all")}>Explore All</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}