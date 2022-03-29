import React, { useState } from "react";
import Register from "./Register";
import Footer from "../home/Footer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    console.log("login", email, password);
    auth(email, password);
    localStorage.setItem("acc", email);
    localStorage.setItem("pass", password);
  };

  const auth = async (email, password) => {
    new Promise((res, rej) => {
      if (true) {
        res(fetch(`http://localhost:5000/accounts/`));
      } else {
        rej("false");
      }
    })
      .then(
        async (res) => {
          const data = await res.json();
          const result = data.filter(
            (account) =>
              account.email === email && account.password === password
          );
          if (result.length === 1) {
            setEmail("");
            setPassword("");

            await saveAuthData(result[0].id);

            navigate("/");
          } else {
            alert("Email or password is incorrect");
          }
        },
        (rej) => {}
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const saveAuthData = async (id) => {
    return await fetch("http://localhost:5000/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
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
        <input type="submit" value="Log In" className="btn btn-block" />
      </form>
      <input type="button" value="Sign up" className="btn btn-block" />

      <Footer />
    </div>
  );
};

export default Login;
