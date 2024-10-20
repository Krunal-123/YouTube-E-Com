import React, { useState, useEffect } from "react";
import Card from "../components/Cards.jsx";
import { Container } from '@mui/material';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Flickty from "../components/Flickty.jsx";
import { Spinner } from "react-bootstrap";
import { useCart } from "./context/CartContext.jsx";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ServiceList() {
  const { services, user,LightMode} = useCart();
  const [cards, setCards] = useState([]);

  // Sort by low to high price
  function sortLowToHigh() {
    if (services) {
      const sortedCards = [...services].sort((a, b) => a.price - b.price);
      setCards(sortedCards);
    }
  }

  // Sort by high to low price
  function sortHighToLow() {
    if (services) {
      const sortedCards = [...services].sort((a, b) => b.price - a.price);
      setCards(sortedCards);
    }
  }

  // Reset to default (unsorted)
  function resetSort() {
    setCards(services);
  }

  // Load services into cards on component mount and services change
  useEffect(() => {
    setCards(services);
  }, [services]);

  if (!cards || !user) {
    return (
      <>
        <Flickty />
        <div className="flex justify-center items-center h-[250px] text-xl">
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  return (
    <>
      <Flickty />
      <div className="my-12">
        {cards.length > 0 ? (
          <h1 className={`mb-4 text-4xl font-extrabold leading-none tracking-tight text-${LightMode?"white":"dark"} md:text-5xl lg:text-6xl text-center`}>
            Our Services
          </h1>
        ) : (
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-red-500 md:text-5xl lg:text-6xl text-center">
            No Data Found!
          </h1>
        )}

        <Container>
          {/* Sort by Price Button */}
          {cards.length !== 0 && <div className="d-flex justify-content-end">
            <Dropdown as={ButtonGroup} className="me-2 shadow-2xl">
              <Button variant="success" className={`font-semibold text-white`}>Sort By Price</Button>
              <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
              <Dropdown.Menu className={`text-center`} >
                <Dropdown.Item className={`hover:font-bold`} onClick={sortLowToHigh}>Low to High</Dropdown.Item>
                <Dropdown.Item className={`hover:font-bold`} onClick={sortHighToLow}>High to Low</Dropdown.Item>
                <Dropdown.Item className={`hover:font-bold`} onClick={resetSort}>Default</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>}

          {/* Cards List */}
          <Row xl={3} className="g-4">
            {cards?.map((d, index) => (
              <Col key={index} className="mt-5">
                <Card
                  id={d._id}
                  img={d.img}
                  title={d.title}
                  status={d.status}
                  color={d.color}
                  description={d.description}
                  email={user[0]?.email}
                  price={d.price}
                />
              </Col>
            ))}
          </Row>
        </Container>

        {!services && (
          <div className="text-center my-10">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
