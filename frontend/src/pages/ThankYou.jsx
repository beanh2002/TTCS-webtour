import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";
import { useState } from "react";
import Booked from "../components/Booked/Booked";

const ThankYou = () => {
  const [show, setShow] = useState(false);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">your tour is booked</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>

            <div className="thank__you">
              <Button
                className="btn primary__btn w-25"
                onClick={() => setShow(!show)}
              >
                Detail
              </Button>
              {show && <Booked />}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
