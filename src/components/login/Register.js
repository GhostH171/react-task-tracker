import React, { useState } from "react";
import Footer from "../home/Footer";
const Register = ({ onAdd }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      alert("Please add email and password");
      return;
    } else if (!email) {
      alert("Please add email");
      return;
    } else if (!password) {
      alert("Please add password");
      return;
    }

    onAdd({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <form className="container" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="form-control">
        <label>Retype Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <input type="submit" value="Create" className="btn btn-block" />

      <Footer />
    </form>
  );
};

export default Register;
