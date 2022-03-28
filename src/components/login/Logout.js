import React from "react";
import Button from "../home/Button";

const Logout = () => {
  const onLogout = async (id) => {
    return await fetch("http://localhost:5000/auth", {
      body: JSON.stringify({}),
    });
  };
  return;
  <form onSubmit={onLogout}>
    <Button color={"red"} text={"Log Out"} />;
  </form>;
};
export default Logout;
