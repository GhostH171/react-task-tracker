import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ProvideAuth, useAuth } from "./components/context/ContextApp";
import Errorpage from "./components/login/Errorpage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  const [listUser, setListUser] = useState([]);
  const callBackToSetListUser = (childData) => {
    console.log(childData);
  };

  return auth.user ? <App /> : <Login callbackFunc={callBackToSetListUser} />;
}

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />} />
            <Route path="*" element={<Errorpage />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </>
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
