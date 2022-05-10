import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../home/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signup = (e) => {
    e.preventDefault();
    localStorage.setItem(username, password);
  };

  return (
    <div className="container">
      <form onSubmit={signup}>
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
        <input
          value="Back to Login"
          type="submit"
          className="btn btn-block"
          onClick={() => {
            navigate("/login");
          }}
        />
      </form>

      <Footer />
    </div>
  );
};

export default Register;
