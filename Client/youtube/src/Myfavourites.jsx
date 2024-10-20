import { Card, Col, Row, Button, Badge } from 'react-bootstrap';
import { useCart } from './context/CartContext'
import { MDBContainer } from 'mdb-react-ui-kit';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaHeartCrack } from 'react-icons/fa6';
import axios from 'axios';
import { errorToast } from '../components/ErrorToast';

function GridExample() {
  const { user, setFav, LightMode } = useCart()

  const handleFavoriteClick = async (email, id) => {
    await axios.post("http://localhost:3000/addfavourite/delete", { email, id });
    errorToast('Remove', 1000)
    setFav((p) => p - 1) // Update the state if successfully added to favorites
  }
  if (!user || user[0].myfavourites <= 0) {
    return (
      <section className="h-[550px] bg-[length:60%_90%] bg-no-repeat bg-center bg-[url('https://cdn.dribbble.com/users/12570/screenshots/13987694/media/1635918fab6854e489723a301619b7b2.jpg?compress=1&resize=400x300')]">
        <MDBContainer className="py-5">
          <div className="text-center my-60 align-items-center">
            {/* <h5 className='text-red-500 text-7xl mb-5 font-bold d-flex justify-content-center'><AiOutlineShoppingCart/>&nbsp; Yet, Not Purchase Anyting</h5> */}
            <Link to={'/home'}>
              <Button className='bg-primary hover:opacity-[0.8]'>Continue Browsing</Button>
            </Link>
          </div>
        </MDBContainer>
      </section>
    )
  }
  return (
    <Container className='my-10'>
      <h2 className={`text-center text-5xl font-bold font-serif mb-4 text-${LightMode ? "white" : "dark"}`}>My favourite items</h2>
      <Row xl={3} className="g-5">
        {[...user[0].myfavourites].reverse().map((d, idx) => ( //using chaining method
          <Col key={idx}>
            <Card className={`border-0 h-[420px] w-[300px] m-auto shadow-xl rounded-xl overflow-hidden transition ease-in-out duration-500 ${LightMode ? "hover:shadow-[0px_20px_25px_4px_rgba(255,0,130,0.9)]" : " hover:shadow-[0_0px_40px_1px_rgba(0,0,0,1)]"} ${LightMode ? "bg-dark" : "bg-white"} ${LightMode ? "text-white" : "text-gray-700"} hover:-translate-y-3`}>
              <FaHeartCrack
                className='text-4xl m-3 cursor-pointer hover:scale-[1.2] transition-transform duration-200'
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  color: '#ff0066', // Red for favorite, grey for not
                }}
                onClick={() => handleFavoriteClick(user[0].email, d._id)}
              />
              <Link to={`/services/${d._id}`}>
                {<Badge bg={"primary"} className='absolute top-[-2px] left-[-2px] text-sm font-extrabold'>{idx + 1}</Badge>}
                <Card.Img variant="top" src={`${d.img}`} className='h-[250px]' />
                <Card.Body>
                  <Card.Title className='bg-clip-text text-xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-yellow-400'>{d.title}</Card.Title>
                  <Card.Text>{d.description.slice(0, 96)}...<span className='text-blue-600 text-xl font-bold hover:underline'>(More)</span></Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GridExample;