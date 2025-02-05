import React, { useState, useEffect } from "react";
import Card from "../components/Cards.jsx";
import { Container } from '@mui/material';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Flickty from "../components/Flickty.jsx";
import { useCart } from "./context/CartContext.jsx";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ShimmerContent from '../ShimmerEffect/ShimmerContent.jsx'


export default function ServiceList() {
  const { services, user, LightMode, sort, setSort } = useCart();
  const { email } = user[0]
  const [sortCallback, setSortcallback] = useState(() => () => { })
  // Load services into the cards components mount and services change
  useEffect(() => {
    const parameters = {
      Default: () => { },
      Accending: (a, b) => a.price - b.price,
      Descending: (a, b) => b.price - a.price
    }
    setSortcallback(() => parameters[sort])
  }, [sort])

  if (!services || !user) {
    return (
      <ShimmerContent />
    );
  }
  else {

    return (
      <>
        <Flickty />
        <div className="my-12">
          {services.length > 0 ? (
            <h1 className={`mb-4 text-4xl font-extrabold leading-none tracking-tight text-${LightMode ? "white" : "dark"} md:text-5xl lg:text-6xl text-center`}>
              Our Services
            </h1>
          ) : (
            <h1 className="my-5 text-4xl font-extrabold leading-none tracking-tight text-red-500 md:text-5xl lg:text-6xl text-center">
              No Data Found!
            </h1>
          )}

          <Container>
            {/* Sort by Price Button */}
            {services.length !== 0 && <div className="d-flex justify-content-end">
              <Dropdown as={ButtonGroup} className="me-2 shadow-2xl" >
                <Button variant="success" className={`font-semibold text-white`}>Sort By Price</Button>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                <Dropdown.Menu className={`text-center`} data-bs-theme={`${LightMode ? "dark" : "light"}`}>
                  <Dropdown.Item className={`hover:font-bold`} onClick={() => setSort((perviousState) => perviousState = "Accending")}>Low to High</Dropdown.Item>
                  <Dropdown.Item className={`hover:font-bold`} onClick={() => setSort((perviousState) => perviousState = "Descending")}>High to Low</Dropdown.Item>
                  <Dropdown.Item className={`hover:font-bold`} onClick={() => setSort((perviousState) => perviousState = "Default")}>Default</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>}

            {/* Cards List */}
            <Row xl={3} className="g-4">
              {[...services]?.sort(sortCallback)?.map(({ _id, img, title, status, color, description, price }, index) => (
                <Col key={index} className="mt-5">
                  <Card id={_id} img={img} title={title} status={status} color={color} description={description} email={email} price={price} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}