import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useCart } from './context/CartContext';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import DisableScrollRestoration from '../components/DisableScrollRestoration';

export default function PersonalProfile() {
  const { user, setUser, LightMode } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  // New states for category and subcategory selections
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  
  DisableScrollRestoration()
  const avatarCategories = {
    'Male': [
      { label: 'Male Avatar 1', value: 'https://yt3.ggpht.com/a/AATXAJzFE_5zKBk19JRw6RbSvLseEhNrI0W5qfPjoQ=s900-c-k-c0xffffffff-no-rj-mo' },
      { label: 'Male Avatar 2', value: 'https://i.pinimg.com/736x/10/11/ef/1011efaaf04baa3b05f1cfb08bd8a9ce.jpg' },
      { label: 'Male Avatar 3', value: 'https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.png' },
      { label: 'Male Avatar 4', value: 'https://img.freepik.com/premium-vector/mens-activities-vector-illustration-displayversatile-men-vector-graphics-compilation_481747-44530.jpg' },
      { label: 'Male Avatar 5', value: 'https://th.bing.com/th/id/OIP.dhhbDwvSxpGSPzhe_PusUAAAAA?pid=ImgDet&w=400&h=400&rs=1' },
      { label: 'Male Avatar 6', value: 'https://th.bing.com/th/id/OIP.OIsYvJFi5XMH1IOajDEv9gHaHa?w=800&h=800&rs=1&pid=ImgDetMain' },
      { label: 'Male Avatar 7', value: 'https://th.bing.com/th/id/OIP.d0X_Gs2lmWSuv4MdtT6JkAHaHa?rs=1&pid=ImgDetMain' },
      { label: 'Male Avatar 8', value: 'https://pbs.twimg.com/profile_images/1481020650487570434/Ma90VOhT_400x400.png' },
    ],
    'Female': [
      { label: 'Female Avatar 1', value: 'https://i.pinimg.com/736x/eb/03/88/eb038855a7042127763c113b35c5b2ca.jpg' },
      { label: 'Female Avatar 2', value: 'https://m.media-amazon.com/images/I/512ktT+5KRL._SY600_.jpg' },
      { label: 'Female Avatar 3', value: 'https://i.pinimg.com/originals/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4.png' },
      { label: 'Female Avatar 4', value: 'https://static.vecteezy.com/system/resources/previews/024/183/500/original/female-avatar-brunette-woman-portrait-illustration-of-a-female-character-in-a-modern-color-style-vector.jpg' },
      { label: 'Female Avatar 5', value: 'https://th.bing.com/th/id/OIP.zj_tNglgTv4H2-WyWVu5BAHaH_?w=1779&h=1920&rs=1&pid=ImgDetMain' },
      { label: 'Female Avatar 6', value: 'https://padletuploads.blob.core.windows.net/prod/52876518/Ou6JMSDD6PHJei824RNhpg/1037fe1cd58ca4e4dae4c3e6de4f63bc.png' },
      { label: 'Female Avatar 7', value: 'https://th.bing.com/th/id/OIP.zQKQ3NjbEtzK8zD8elvxHwHaHa?rs=1&pid=ImgDetMain' },
      { label: 'Female Avatar 8', value: 'https://www.educake.co.uk/wp-content/uploads/2022/03/sarah-strange.png' },
    ]
  };

  // UseEffect to initialize editDetails with user data
  useEffect(() => {
    if (user && user.length > 0) {
      const { profilePic, firstName, lastName, email, gender, number, _id, createdAt } = user[0];
      setSelectedAvatar(profilePic);
      setEditDetails({ profilePic, firstName, lastName, email, gender, number, _id, createdAt });
    }
  }, [user]);
  useEffect(() => {
    setSelectedCategory(editDetails.gender);
  }, [editDetails])

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setEditDetails((prevDetails) => ({ ...prevDetails, gender: e.target.value }));
    // setSelectedAvatar(''); // Reset the avatar selection when the category changes
  };

  const handleAvatarChange = (e) => {
    setSelectedAvatar(e.target.value);
    setEditDetails((prevDetails) => ({ ...prevDetails, profilePic: e.target.value }));
  };

  const handleSave = async () => {
    try {
      let res = await axios.patch("https://youtube-e-com-backend.onrender.com/updatedetails", editDetails);
      setIsEditing(false);
      setUser([{ ...user[0], ...editDetails }]);
    } catch (error) {
      console.error("Failed to update details:", error);
      alert("Failed to save details. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditDetails(user[0]); // Reset to original user data
  };

  if (!user || user.length === 0) {
    return (
      <section className="bg-[#f4f5f7]">
        <MDBContainer className="py-10 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <Spinner animation="border" />
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }

  return (
    <section className="">
      <MDBContainer className="py-10 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" className="mb-4">
            <MDBCard className={`mb-3 shadow-2xl rounded-2xl ${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="bg-[url(https://img.freepik.com/free-vector/black-wallpaper-with-silver-geometric-lines_1017-30669.jpg?w=996&t=st=1693673570~exp=1693674170~hmac=a816b7b1607c955137b5ce41b9e03a09728e8d16335a2e395beb5818dc43c41d)] bg-cover text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage
                    src={editDetails.profilePic || "default-avatar-url.jpg"}
                    alt="Avatar"
                    className="my-5 h-[350px] w-[80%] m-auto rounded-[15%] shadow-lg"
                    fluid
                  />
                  <MDBTypography tag="h5" className="mb-0 text-3xl font-bold">
                    <i className="font-mono text-4xl">{editDetails?.gender == "Male" ? "MR." : "MS."}</i><span>{editDetails.firstName} {editDetails.lastName}</span>
                    <p className='flex justify-content-center text-3xl font-bold'>
                      <img src={editDetails?.gender == "Female" ?
                        "https://assets-global.website-files.com/62d22090d818f11cd8518c8d/62d22ae5360d5986f0356783_female-p-500.png"//female url
                        :
                        'https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-flat/256/Male-Sign-Flat-icon.png'//MAle url
                      }
                        className='h-[40px] my-3 rounded' />
                    </p>
                  </MDBTypography>
                  <div className='mb-5 text-xl hover:text-green-400 transition easy-in-out hover:scale-[1.2] hover:underline font-bold' onClick={handleEditToggle} style={{ cursor: 'pointer' }}>
                    <MDBIcon far icon="edit" />
                    <i> Edit Profile</i>
                  </div>
                </MDBCol>
                <MDBCol md="8" className='py-5'>
                  <MDBCardBody className="px-5 pt-5 text-lg font-semibold">
                    <MDBTypography className='flex justify-between text-xl max-md:text-sm'>
                      <span><span className='text-gray-300'>Account ID:</span> <i>{editDetails._id}</i></span> 
                      <span><span className='text-gray-300'>createdAt:</span> {new Date(editDetails?.createdAt).toLocaleDateString()}</span>
                    </MDBTypography>
                    <hr className="mt-2 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3 max-md:text-sm text-xl">
                        <MDBTypography tag="h6" className='text-gray-300'>Email:</MDBTypography>
                        <MDBCardText>{editDetails.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3 max-md:text-sm text-xl">
                        <MDBTypography tag="h6" className='text-gray-300 max-md:text-sm text-xl'>Name:</MDBTypography>
                        {isEditing ? (
                          <>
                            <MDBInput
                              name="firstName"
                              value={editDetails.firstName}
                              onChange={handleInputChange}
                              className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"} mb-2`}
                            />
                            <MDBInput
                              name="lastName"
                              value={editDetails.lastName}
                              onChange={handleInputChange}
                              className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}
                            />
                          </>
                        ) : (
                          <MDBCardText>{editDetails.firstName} {editDetails.lastName}</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr className="mt-3 mb-4" />
                    <MDBRow className="pt-1">
                      {isEditing ? (
                        <>
                          <MDBCol size="6" className="mb-3 max-md:text-sm text-xl">
                            <MDBTypography tag="h6" className='text-gray-300'>Gender:</MDBTypography>
                            <Select
                              name='gender'
                              value={editDetails.gender}
                              onChange={handleCategoryChange}
                              fullWidth
                              className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}
                            >
                              {Object.keys(avatarCategories).map((category) => (
                                <MenuItem key={category} value={category} >
                                  {category}
                                </MenuItem>
                              ))}
                            </Select>
                          </MDBCol>

                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6" className='text-gray-300'>Select Avatar:</MDBTypography>
                            <Select
                              name='profilePic'
                              value={selectedAvatar}
                              onChange={handleAvatarChange}
                              fullWidth
                              disabled={!editDetails.gender}
                              className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}
                            >
                              {selectedCategory &&
                                avatarCategories[selectedCategory].map(({ value, label }, index) => (
                                  <MenuItem key={index} value={value} className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}>
                                    <img src={value} alt={label} className="w-[50px] h-[50px] mr-2" />
                                    {label}
                                  </MenuItem>
                                ))}
                            </Select>
                          </MDBCol>
                        </>
                      ) : (
                        <MDBCol>
                          <MDBTypography tag="h6" className='text-gray-300'>Gender:</MDBTypography>
                          <MDBCardText>{editDetails.gender}</MDBCardText>
                        </MDBCol>

                      )}

                      <MDBCol size="6" className="mb-3 max-md:text-lg text-xl">
                        <MDBTypography tag="h6" className='text-gray-300'>Phone:</MDBTypography>
                        {isEditing ? (
                          <MDBInput
                            name="number"
                            value={editDetails.number || ''}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <MDBCardText><i className='font-mono'>{editDetails.number || 'N/A'}</i></MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>

                    {isEditing && (
                      <div className="d-flex justify-content-between">
                        <Button className="btn-success px-4" onClick={handleSave}>Save</Button>
                        <Button className="btn-danger px-3" onClick={handleCancel}>Cancel</Button>
                      </div>
                    )}

                    {!isEditing && (
                      <div className="d-flex justify-content-start">
                        <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                        <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                      </div>
                    )}
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
