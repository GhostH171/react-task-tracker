import React from "react";
import { useNavigate } from "react-router";
import Button from "../home/Button";

const Logout = () => {
  // const commonVar = fetch(`http://localhost:5000/auth/${id}`);
  const acc = localStorage.getItem("acc");

  const navigate = useNavigate();

  const onLogouHandler = async () => {
    debugger;
    navigate("/login");
  };
  return (
    <form>
      <Button
        color={"red"}
        text={"Log Out"}
        type={"submit"}
        onClick={onLogouHandler()}
      />
    </form>
  );
};
export default Logout;
