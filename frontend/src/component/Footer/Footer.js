import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";

function Footer() {
  const year = moment().format("YYYY");

  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">copyright &copy; {year} Memo</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
