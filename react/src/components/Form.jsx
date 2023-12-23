"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export const Form = () => {
  const [users, setUsers] = useState([]);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);

  //GETの処理
  useEffect(() => {
    const userData = async () => {
      const response = await axios.get("http://localhost:3000");
      setUsers(response.data);
    };
    userData();
  }, []);

  //POSTの処理
  const btnClick = (e) => {
    e.preventDefault();

    const userPost = async () => {
      try {
        await axios.post("http://localhost:3000", {
          name: names,
          email: emails,
        });
      } catch (err) {
        console.log("Front Error!!", err);
      }
    };
    userPost();
    setNames("");
    setEmails("");
  };

  //PUDATEの処理
  const updateBtn = async (id) => {
    const updateUser = async () => {
      try {
        await axios.patch(`http://localhost:3000/update/${id}`, {
          name: names,
          email: emails,
        });
      } catch (err) {
        console.log("Front Error!!", err);
      }
    };
    updateUser();
    setNames("");
    setEmails("");
    window.location.reload();
  };

  //DELETEの処理
  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        console.log("DELETE FRONT!!", res);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const handleChangeName = (e) => {
    setNames(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmails(e.target.value);
  };

  return (
    <>
      <div>
        <p>フォームページ</p>
        <ul style={{ listStyleType: "none" }}>
          {users.map((user, index) => (
            <li key={index}>
              <p>{`ID:${user.id}`}</p>
              <p>{`名前:${user.name}、メール:${user.email}`}</p>
              <button onClick={() => deleteUser(user.id)}>削除</button>
              <button onClick={() => updateBtn(user.id)}>更新</button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={btnClick}>
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
    </>
  );
};
