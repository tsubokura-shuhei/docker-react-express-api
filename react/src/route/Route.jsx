// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Page1 } from "../components/Page1";
import { Form } from "../components/Form";

export const RouteConfig = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
