// this is the page where the user enter his (account and address)
import React from 'react';
import React, { useState, useRef, useEffect } from "react";
const { uuid } = require("uuidv4");

const LOCAL_STORAGE_KEY = "usersApp.users";

function User() {
    const [users, setUsers] = useState([]);
    const userNameRef = useRef();

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  function RestartAddresses(e) {
    setUsers(() => {
      return [];
    });
  }

  function handleLogInUser(e) {
    const name = userNameRef.current.value;
    if (name === "") return;
    console.log(name);
    setUsers((prevAccounts) => {
      return [...prevAccounts, { id: 1, name: name, complete: false }];
    });
  }

    return (
    <>
      <head></head>
      <input ref={userNameRef} type="text" />
      <button onClick={handleLogInUser}>Send Address</button>
      <button onClick={RestartAddresses}>Restart raffle</button>
      <a href="Owner.js">Owner page</a>
      <div>{users.length} addresses </div>
    </>
    )
}
export default User;