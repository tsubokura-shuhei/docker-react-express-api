// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { Page1 } from "../components/Page1";
import { Form } from "../components/Form";
import { FormUpdate } from "../components/pages/FormUpdate";
import NotFound from "../components/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";

export const RouteConfig = () => {
  const [users, setUsers] = useState([]);
  //GETの処理
  useEffect(() => {
    const userData = async () => {
      const response = await axios.get("http://localhost:3000");
      setUsers(response.data);
      console.log(users);
    };
    userData();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/form" element={<Form />} />
          {users.map((user) => (
            <Route
              key={user.id}
              path={`/update/${user.id}`}
              element={<FormUpdate users={user} />}
            />
          ))}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
