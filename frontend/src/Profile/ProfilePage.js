import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../component/MainScreen";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);

  const { loading, error, success } = userUpdate;

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>Form</Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Profilepic
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
