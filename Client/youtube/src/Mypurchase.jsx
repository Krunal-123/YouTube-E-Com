import React, { useState } from 'react';
import { Card, Col, Row, Button, Modal, Badge } from 'react-bootstrap';
import { useCart } from './context/CartContext';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import DisableScrollRestoration from '../components/DisableScrollRestoration';

function GridExample() {
  const { user, services, isExploding, LightMode, LengthCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { myitems } = user[0]
  const Devicewidth = window.outerWidth

  DisableScrollRestoration()
  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  if (!services) return

  if (!user || user[0].myitems == 0) {
    return (
      <section className="h-[65vh] md:h-[550px] bg-[length:100%_100%] bg-no-repeat bg-center bg-[url('https://www.pngkey.com/png/detail/365-3654131_cart-empty-image-your-cart-is-empty.png')]">
        <MDBContainer className="py-5">
          <div className="text-center my-40 align-items-center">
            <h5 className='text-red-500 text-5xl md:text-7xl mb-5 font-bold d-flex justify-content-center font-mono'>
              You Haven't Buy Anything
            </h5>
            <Link to={'/home'}>
              <Button className='bg-primary hover:opacity-[0.9]'>Continue Browsing</Button>
            </Link>
          </div>
        </MDBContainer>
      </section>
    );
  }

  return (
    <Container className='my-10 overflow-x-hidden' maxWidth="xl">
      <div className='flex justify-around'>
        {isExploding && <ConfettiExplosion force={1} duration={4500} particleCount={150} width={Devicewidth} />}
        {Devicewidth > 768 && isExploding && <ConfettiExplosion force={1} duration={4500} particleCount={150} width={Devicewidth} />}
      </div>
      <h2 className={`text-center text-5xl font-bold mb-5 font-serif text-${LightMode ? "white" : "dark"}`}>My Purchase Items:- ({user[0].myitems.length})</h2>
      <Row xl={4} className="g-3">
        {[...myitems].reverse().map(({ _id, img, title, description, content }, idx) => (
          <Col key={idx} className='mt-5'>
            <Card className={`border-0 h-[450px] w-[300px] m-auto overflow-hidden rounded-xl shadow-2xl transition ease-in-out duration-500 hover:-translate-y-3 ${LightMode ? "hover:shadow-[0px_14px_25px_4px_rgba(205,0,255,1)]" : " hover:shadow-[0_0px_40px_1px_rgba(0,0,0,1)]"} ${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-gray-700"}`} >
              {LengthCart.some((ele) => ele == _id) && <Badge bg={"primary"} className='z-10 absolute top-[-3px] left-[-4px] text-sm font-extrabold'>NEW</Badge>}
              {<Badge bg={"warning"} className='absolute top-[-3px] right-[-3px] text-sm font-extrabold'>{idx + 1}</Badge>}
              <Card.Img variant="top" src={`${img}`} className='h-[250px]' />
              <Card.Body>
                <Card.Title className='bg-clip-text text-xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-yellow-400'>{title}</Card.Title>
                <Card.Text>{description.slice(0, 96)}...</Card.Text>
              </Card.Body>
              <button className='bg-primary hover:opacity-[0.8] py-2 text-white font-bold text-xl font-mono' onClick={() => handleShowModal({ _id, img, title, description, content })}>
                Watch
              </button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to show thumbnails */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}>
          <Modal.Title>{selectedItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}>
          <iframe width="100%" height="600px" src={`${selectedItem?.content}`} title="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </Modal.Body>
        <Modal.Footer className={`${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-dark"}`}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GridExample;
