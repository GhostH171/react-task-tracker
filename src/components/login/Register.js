import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../home/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    setUsers(usersFromServer);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    // Get data from response
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  const updateUsers = async (user) => {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    setUsers([...users, data]);
  };

  let onRegisterHandler = async (e) => {
    e.preventDefault();

    console.log(users);

    const checkDuplicate = users.find((data) => data.username === username);

    if (!username || !password) {
      alert("Invalid data!");
      return;
    }

    if (checkDuplicate) {
      alert("Account is already existed");
      return;
    }

    updateUsers({
      username,
      password,
    });
  };

  return (
    <div className="container">
      <form onSubmit={onRegisterHandler}>
        <div className="form-control">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign Up" className="btn btn-block" />
      </form>
      <input
        value="Back to Login"
        type="submit"
        className="btn btn-block"
        onClick={() => {
          navigate("/Login");
        }}
      />

      <Footer />
    </div>
  );
};

export default Register;
