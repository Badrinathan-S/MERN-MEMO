import React, { useState } from "react";
import MainScreen from "../../component/MainScreen";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  return <MainScreen title="REGISTER">RegisterScreen</MainScreen>;
};

export default RegisterScreen;
