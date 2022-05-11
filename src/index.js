import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import { ProvideAuth, useAuth } from "./components/context/ContextApp";
import Errorpage from "./components/login/Errorpage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const AuthenticatePages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, []);

  return (
    <Routes>
      {user ? (
        <Route index element={<App />} />
      ) : (
        <>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </>
      )}

      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <AuthenticatePages />
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
