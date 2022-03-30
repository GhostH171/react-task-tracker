import React, { useState } from "react";
import Footer from "../home/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/ContextApp";
const LoginForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let { from } = location.state || { from: { pathname: "/" } };

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
        <input type="submit" value="Log In" className="btn btn-block" />
      </form>
      <input type="button" value="Sign up" className="btn btn-block" />

      <Footer />
    </div>
  );
};

export default LoginForm;
