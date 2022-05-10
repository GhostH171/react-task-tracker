import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/ContextApp";
import Footer from "../home/Footer";

const LoginForm = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let {} = location.state || { from: { pathname: "/" } };

  let login = () => {
    if (username !== "" && password !== "") {
      auth.signin({ user: username, passoword: password }, () => {});
      navigate("/");
    } else {
      alert("nhap vao di");
    }
  };
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
    console.log(data);
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form onSubmit={login}>
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
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Log In" className="btn btn-block" />
      </form>
      <input
        type="button"
        value="Sign up"
        className="btn btn-block"
        onClick={() => {
          navigate("/Register");
        }}
      />

      <Footer />
    </div>
  );
};

export default LoginForm;
