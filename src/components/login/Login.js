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
    if (user !== "" && email !== "") {
      auth.signin({ user: user, email: email }, () => {});
      navigate("/");
    } else {
      alert("nhap vao di");
    }
  };
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const usersFromServer = await fetchUsers();
    setUsers(usersFromServer);
  };

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    // Get data from response
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    callbackFunc(true);
  }, [users, callbackFunc]);

  const onClickHandler = () => {
    const findUser = users.find(
      (data) => data.username === user && data.email === email
    );
    if (findUser) {
      navigate("/App");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <form onSubmit={login}>
        <div className="form-control">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Log In"
          className="btn btn-block"
          onClick={onClickHandler}
        />
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
