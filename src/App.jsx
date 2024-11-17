import React, { useContext } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRoutes, Link, Routes, Route } from "react-router-dom"
import { Home } from "../components/Home";
import { Tienda } from "../components/Tienda";
import { Pasteleria } from "../components/Pasteleria";
import { Macarons } from "../components/Macarons";
import { Pales } from "../components/Pales";
import { Panes } from "../components/Panes";
import { Tartas } from "../components/Tartas";
import { Entremets } from "../components/Entremets";
import { Register } from "../components/Register.jsx";
import { Login } from "../components/Login.jsx";
import {Ajustes} from "../components/Ajustes.jsx"
import { Catalogo } from "../components/Catalogo.jsx";

const App = () => {

  // console.log(token);
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/pasteleria" element={<Pasteleria />} />
          <Route path="/macarons" element={<Macarons />} />
          <Route path="/pales" element={<Pales />} />
          <Route path="/panes" element={<Panes />} />
          <Route path="/tartas" element={<Tartas />} />
          <Route path="/entremets" element={<Entremets />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ajustes" element={<Ajustes/>} />
        </Routes>
    </>
  );
};
export default App;