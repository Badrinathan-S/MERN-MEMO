import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../component/MainScreen";
import ErrorMessage from "../component/ErrorMessage";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { updateProfile } from "../actions/userActions";
import axios from "axios";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [message, setMessage] = useState();

  const api_key = "778248231698155";

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);

  const { loading, error, success } = userUpdate;

  const submitHandler = (e) => {
    e.preventDefault();

    if(password === confirmPassword){
      dispatch(updateProfile({name, email, password, pic}));
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
    if(!userInfo){
      navigate("/home");
    }else{

      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);

    }
  }, [navigate, userInfo])

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading/>}
              {success && (
                <ErrorMessage variant="success">
                  Updated success
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage varient="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
              <Form.Label>Change Profile picture</Form.Label>
              <Form.Control
                 type="file"
                 onChange={(e) => postDetails(e.target.files[0])}
                />
              </Form.Group>
              <Button type="submit" varient="primary">Update</Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
