import React, { useState } from "react";
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
  console.log(auth);
  const callBackToSetListUser = (childData) => {
    auth.setListuser(childData);
  };
  const [flag, setFlag] = useState(false);

  return flag ? <App /> : <Login callbackFunc={callBackToSetListUser} />;
}

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<PrivateRoute />} />
            <Route path="*" element={<Errorpage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/App" element={<App />} />
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
