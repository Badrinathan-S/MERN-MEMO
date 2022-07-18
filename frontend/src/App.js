import React from "react";
import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import LandingPage from "./Screen/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./Screen/MyNotes/MyNotes";
import LoginScreen from "./Screen/LoginScreen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import CreateNote from "./Screen/CreateNote/createNote";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/createnote" element={<CreateNote />} />
      <Route path="/mynotes" element={<MyNotes />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
