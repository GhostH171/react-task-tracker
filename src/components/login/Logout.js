import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../home/Button";
import { useAuth } from "../context/ContextApp";

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    auth.signin();
    navigate("/Login");
  };
  return (
    <form onSubmit={onLogoutHandler}>
      <Button color={"red"} text={"Log Out"} type={"submit"} />
    </form>
  );
};
export default Logout;
