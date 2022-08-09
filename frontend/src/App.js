import React, { useState } from "react";
import "./App.css";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import LandingPage from "./Screen/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./Screen/MyNotes/MyNotes";
import LoginScreen from "./Screen/LoginScreen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import CreateNote from "./Screen/CreateNote/CreateNote";
import SinglePage from "./Screen/CreateNote/SinglePage";
import ProfilePage from "./Profile/ProfilePage";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/note/:id" element={<SinglePage />} />
        <Route path="/mynotes" element={<MyNotes search={search} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
