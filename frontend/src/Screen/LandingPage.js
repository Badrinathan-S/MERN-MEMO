import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to memo</h1>
              <p className="subtitle">Once safe place for all you thoughts.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingButton">
                  Login
                </Button>
              </a>
              <a href="/signup">
                <Button
                  size="lg"
                  className="landingButton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
