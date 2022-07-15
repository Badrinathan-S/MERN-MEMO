import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import MainScreen from "../../component/MainScreen";
import "./RegisterScreen.css";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../component/ErrorMessage";
import axios from "axios";
import Loading from "../../component/Loading";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const api_key = "778248231698155";
  // const cloud_name = "draydgazh";

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("password do not match!!");
    } else {
      setMessage(null);
      dispatch(register(email, password, name, pic));
    }
  };

  const postDetails = async (pics) => {
    // console.log(pics);
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("api_key", api_key);
      data.append("upload_preset", "MEMO-MERN");
      data.append("cloud_name", "draydgazh");
      // eslint-disable-next-line
      const cloudinaryResponse = await axios
        .post(`https://api.cloudinary.com/v1_1/MEMO-MERN/auto/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            // console.log(e.loaded / e.total);
          },
        })
        .then(({ data }) => {
          setPic(data.url.toString());
          // console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("please select an image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo, navigate]);

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="form-group" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
          </Form.Group>
          <Form.Group className="form-group" controlId="formFile">
            <Form.Label>Profile picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
