import React from "react";
import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import LandingPage from "./Screen/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./Screen/MyNotes/MyNotes";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mynotes" element={<MyNotes />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
