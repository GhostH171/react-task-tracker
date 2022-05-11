import PropTypes from "prop-types";

import React from "react";
import Button from "./Button";
import { useAuth } from "../context/ContextApp";

const Header = ({ title, onAdd, showAdd }) => {
  const auth = useAuth();

  return (
    <header className="header">
      <h1>Todo list </h1> <br />
      {/* <h2>Welcome {auth.user()}</h2> */}
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

export default Header;
