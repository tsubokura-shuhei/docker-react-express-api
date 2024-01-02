"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FormUpdate = (props) => {
  const { users } = props;
  const { id, name, email } = users;

  const navigate = useNavigate();

  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);

  //PUDATEの処理
  const updateBtn = async () => {
    const updateUser = async () => {
      try {
        await axios.patch(`http://localhost:3000/update/${id}`, {
          name: names,
          email: emails,
        });
        setNames("");
        setEmails("");
      } catch (err) {
        console.log("PUDATE Front Error!!", err);
      }
    };
    updateUser();
    navigate("/form");
  };

  const handleChangeName = (e) => {
    setNames(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmails(e.target.value);
  };
  return (
    <div>
      <p>{`${id}ページ`}</p>
      <p>{`名前:${name}`}</p>
      <p>{`メール:${email}`}</p>

      <form onSubmit={updateBtn}>
        <label>
          名前:
          <input type="text" value={names} onChange={handleChangeName} />
        </label>
        <label>
          メール:
          <input type="text" value={emails} onChange={handleChangeEmail} />
        </label>
        <button type="submit">データ送信</button>
      </form>
    </div>
  );
};
