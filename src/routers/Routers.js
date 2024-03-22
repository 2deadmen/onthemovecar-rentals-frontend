import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";

import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Clock from "../pages/clock";
import Adminlogin from "../pages/Adminlogin";
import Admin from "../pages/Admin";
import Addcar from "../pages/Addcar";
import Book from "../pages/Book";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
   
      <Route path="/booking" element={<Book />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/clock" element={<Clock />} />
      <Route path="/adminlogin" element={<Adminlogin/>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/addcar" element={<Addcar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
