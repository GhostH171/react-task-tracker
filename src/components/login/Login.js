import React, { useState } from "react";
import Register from "./Register";
import Footer from "../home/Footer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username && !email) {
      alert("Please add User Name and Email");
      return;
    } else if (!username) {
      alert("Please add User Name");
      return;
    } else if (!email) {
      alert("Please add Email");
      return;
    }
    console.log("login", username, email);
    auth(username, email);
    localStorage.setItem("UserName", username);
    localStorage.setItem("Email", email);
  };

  const auth = async (username, email) => {
    new Promise((res, rej) => {
      if (true) {
        res(fetch(`https://jsonplaceholder.typicode.com/users`));
      } else {
        rej("false");
      }
    })
      .then(
        async (res) => {
          const data = await res.json();
          const result = data.filter(
            (account) =>
              account.username === username && account.email === email
          );
          if (result.length === 1) {
            setUserName("");
            setEmail("");
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

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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

export default Login;
