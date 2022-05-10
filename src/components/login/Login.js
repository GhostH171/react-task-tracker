import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/ContextApp";
import Footer from "../home/Footer";

const LoginForm = (props) => {
  const { callbackFunc } = props;

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let {} = location.state || { from: { pathname: "/" } };

  let login = () => {
    if (username !== "" && password !== "") {
      auth.signin({ username: username, password: password }, () => {});
      navigate("/");
    } else {
      alert("Input Email and Password");
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  console.log(users);
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

  const onClickHandler = () => {
    const findUser = users.find(
      (data) => data.username === username && data.password === password
    );
    if (findUser) {
      navigate("/App");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="container">
      <form onSubmit={onClickHandler}>
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
