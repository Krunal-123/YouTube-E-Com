import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { FaUsers, FaLightbulb, FaCogs, FaSmile, FaHistory } from 'react-icons/fa';
import { useCart } from './context/CartContext';
import DisableScrollRestoration from '../components/DisableScrollRestoration';

function AboutUs() {
  const { LightMode } = useCart()
  return (
    <>
      {/* Header Section */}
      <DisableScrollRestoration />
      <div className="text-white text-center bg-gray-900 h-64 flex justify-center items-center">
        <div>
          <h1 className="text-5xl font-bold">About Us</h1>
          <p className="mt-2 text-xl">Learn more about our team and our mission</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-5 py-12">
        {/* Our Mission, Team, and Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className={`shadow-lg p-6 text-center bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
            <FaUsers size={50} className="mb-4 text-blue-500 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">Our Team</h2>
            <p className={`text-${LightMode ? "white" : "dark"}`}>We are a group of passionate professionals committed to delivering excellence. Our team is diverse, creative, and driven by the desire to innovate.</p>
          </div>

          <div className={`shadow-lg p-6 text-center bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
            <FaLightbulb size={50} className="mb-4 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className={`text-${LightMode ? "white" : "dark"}`}>Our mission is to provide high-quality solutions that make life easier and more enjoyable for our customers. We strive to lead the industry with our innovative ideas.</p>
          </div>

          <div className={`shadow-lg p-6 text-center bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
            <FaCogs size={50} className="mb-4 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold mb-2">Our Services</h2>
            <p>We offer a range of services that cater to your needs, from consulting to development. We focus on quality, efficiency, and customer satisfaction.</p>
          </div>

        </div>

        {/* Our Story Section */}
        <div className="mb-12">
          <div className={`shadow-lg p-6 text-center text-${LightMode ? "white" : "dark"} bg-${LightMode ? "dark" : "white"}`}>
            <h2 className="text-4xl font-bold text-center mb-6">Our Story</h2>
            <p>
              Founded in 2022, our company started with a simple idea to innovate and improve the everyday lives of people. Over the years, we have grown into a team of dedicated professionals who are passionate about making a difference. Our story is one of perseverance, creativity, and a relentless commitment to quality.
            </p>
            <div className="text-center mt-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition-all">Learn More</button>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-12">
          <h2 className={`text-4xl font-bold text-center mb-6 text-${LightMode ? "white" : "dark"}`}>Meet To Our Developer</h2>
          <div className="flex justify-around">
            <div className={`shadow-lg rounded-lg overflow-hidden bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"} w-[400px]`}>
              <img src={'https://res.cloudinary.com/dlhikwznm/image/upload/v1730019097/krunali_ipzrdb.jpg'} alt="Krunal Parmar" className="h-80 w-full object-fill" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold">Krunal Parmar</h3>
                <p className="text-blue-400 font-bold">Full Stack Developer</p>
                <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--6rc65PKG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6uua71pthj5ricfxhh3m.png" className="h-10 mx-auto mt-4" alt="Stack" />
              </div>
            </div>
          </div>
        </div>

        {/* Company Milestones Section */}
        <div className="mb-12">
          <h2 className={`text-4xl font-bold text-center mb-6 text-${LightMode ? "white" : "dark"}`}>Our Milestones</h2>
          <div className={`shadow-lg p-6 bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
            <FaHistory size={40} className="mb-4 text-blue-500 mx-auto" />
            <ul className="list-disc pl-6 space-y-2">
              <li>2010: Founded with a vision to innovate.</li>
              <li>2012: Launched our first product.</li>
              <li>2015: Expanded our team to over 50 members.</li>
              <li>2018: Reached 100,000 customers worldwide.</li>
              <li>2021: Recognized as an industry leader.</li>
            </ul>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12">
          <h2 className={`text-4xl font-bold text-center mb-6 text-${LightMode ? "white" : "dark"}`}>Our Happy Clients😊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Shradha Khapra",
                testimonial: "Working with this team was an absolute pleasure. Their attention to detail and commitment to delivering quality exceeded all my expectations.",
                image: "https://i.ytimg.com/vi/EX7SB1y3kLI/maxresdefault.jpg"
              },
              {
                name: "Soul Mortal",
                testimonial: "The results were phenomenal. Their dedication and expertise really shone through every step of the way. Highly recommend!",
                image: "https://pubglitemobile.com/wp-content/uploads/2021/05/Soul-Mortal-PUBG.jpg"
              }
            ].map(({ image, name, testimonial }, index) => (
              <div key={index} className={`shadow-lg rounded-lg overflow-hidden bg-${LightMode ? "dark" : "white"} text-${LightMode ? "white" : "dark"}`}>
                <img src={image} alt={name} className="h-80 w-full object-cover" />
                <div className="p-6 text-center">
                  <FaSmile size={30} className="my-2 text-yellow-500 mx-auto" />
                  <p className="font-bold text-xl mb-2">"{name}"</p>
                  <p className="">"{testimonial}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Row className="my-5">
          <Col md={12} >
            <h2 className={`text-4xl font-bold text-center mb-6 text-${LightMode ? "white" : "dark"}`}>Frequently Asked Questions</h2>
            <Accordion data-bs-theme={`${LightMode ? "dark" : "light"}`}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What services do you offer?</Accordion.Header>
                <Accordion.Body>
                  We offer a variety of services including consulting, development, and project management tailored to your specific needs.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How can I contact you for more information?</Accordion.Header>
                <Accordion.Body>
                  You can contact us through our website's contact form, email, or by calling our customer service hotline.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Do you offer custom solutions?</Accordion.Header>
                <Accordion.Body>
                  Yes, we specialize in providing custom solutions that fit your unique requirements. Contact us to discuss your project.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AboutUs;
