import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../home/Button";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <form>
      <Button
        color={"red"}
        text={"Log Out"}
        type={"submit"}
        onClick={() => {
          navigate("/");
        }}
      />
    </form>
  );
};
export default Logout;
