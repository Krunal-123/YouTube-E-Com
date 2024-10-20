import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Toast } from '../components/SuccessToast';
import axios from 'axios';
import { errorToast } from '../components/ErrorToast';
import { useCart } from './context/CartContext';

function ContactUs() {
  const { LightMode, user } = useCart()
  const [bool, setBool] = useState(false)

  // function
  async function handleSubmit(e) {
    e.preventDefault()
    const { Name, Number, Email, Subject, Message, optional } = e.target
    console.log(e.target);
    const data = {
      Name: Name.value,
      Phone: Number.value,
      optional_Phone: optional.value,
      Email: Email.value,
      Subject: Subject.value,
      Message: Message.value
    }
    // Front-end validation for phone number length
    if (optional.value.length !== 10) {
      errorToast('Invalid phone number! Please Enter the 10-digit!', 4000);
      return;
    }

    try {
      await axios.post("http://localhost:3000/usersdetails", { ...data })
      setBool(p => !p)
      Toast("Submitted", 1000)
      optional.value = ''
      Subject.value = ''
      Message.value = ''
    } catch (error) {
      console.log(error);
    }
  }
  if (!user) {
    return
  }

  return (
    <>
      {/* Header Section */}
      <div className="bg-slate-900 h-40 text-white flex justify-center items-center mt-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="mt-2 text-xl">We'd love to hear from you. Get in touch with us!</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className={`mt-5 shadow-lg rounded-lg p-8 transition ease-in-out bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"} hover:scale-[1.01]`}>
              <h2 className="text-2xl font-semibold  mb-6">Send Us a Message</h2>
              <form
                onSubmit={handleSubmit}
              >
                <div className="mb-4 hidden">
                  <label className="block  text-sm font-bold mb-2" htmlFor="formName">
                    Name
                  </label>
                  <input
                    name='Name'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    type="text"
                    placeholder="Enter your name"
                    value={`${user[0].firstName} ${user[0].lastName}`}
                    disabled
                    required
                  />
                </div>
                <div className="mb-4 hidden">
                  <label className="block text-sm font-bold mb-2" htmlFor="formEmail" max="10">
                    Phone No:-
                  </label>
                  <input
                    name='Number'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    type="number"
                    placeholder="Enter your Phone Number"
                    value={user[0].number}
                    disabled
                    required
                  />
                </div>
                <div className="mb-4 hidden">
                  <label className="block text-sm font-bold mb-2" htmlFor="formEmail">
                    Email
                  </label>
                  <input
                    name='Email'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    type="email"
                    placeholder="Enter your email"
                    value={user[0].email}
                    disabled
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="formEmail" max="10">
                    Contact No:-
                  </label>
                  <input
                    name='optional'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    type="number"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="formSubject">
                    Subject
                  </label>
                  <input
                    name='Subject'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    type="text"
                    placeholder="Enter the subject"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold mb-2" htmlFor="formMessage">
                    Message
                  </label>
                  <textarea
                    name='Message'
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-dark"
                    rows="5"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button
                    className={`${bool ? "bg-gray-500" : "bg-blue-500"} ${bool ? "hover:bg-gray-500" : "hover:bg-blue-500"} text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={bool}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div className={`shadow-lg mt-3 rounded-lg p-6 text-center transition-transform transform hover:scale-105 bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
              <FaMapMarkerAlt size={30} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Our Office</h3>
              <p>
                1234 Street Name, <br />
                City, State, 56789
              </p>
            </div>

            <div className={`shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
              <FaPhone size={30} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p>(123) 456-7890</p>
            </div>

            <div className={`shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
              <FaEnvelope size={30} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold ">Email Us</h3>
              <p>YoutubeE-com@company.com</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className={`text-center text-2xl font-bold mb-6 text-${LightMode ? "white" : "dark"}`}>Find Us on the Map</h2>
          <div className="relative h-96 w-full shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.3206601524232!2d73.1409527875289!3d22.32940091837087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8f9fc0c9e25%3A0x5dd2b716d2729b46!2sMadhuvan%20Duplex%2C%20C14%2C%20Laxmipura%20Rd%2C%20Laxmipura%2C%20Subhanpura%2C%20Vadodara%2C%20Gujarat%20390016!5e0!3m2!1sen!2sin!4v1729251656511!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-none"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
