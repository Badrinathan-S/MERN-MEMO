import React, { useState } from "react";
import { Form } from "react-bootstrap";
import MainScreen from "../../component/MainScreen";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={name}
              placeholder="Enter password"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              value={name}
              placeholder="Confirm password"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              // onChange={(e)=>postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              placeholder="Confirm Password"
              custom="true"
            />
          </Form.Group>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
