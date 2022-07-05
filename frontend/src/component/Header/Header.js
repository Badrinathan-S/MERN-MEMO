import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Memo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <NavDropdown title="osama bin laden" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
