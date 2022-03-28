import React from "react";
import Propstypes from "prop-types";

const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className="btn"
      >
        {text}
      </button>
    </div>
  );
};
Button.defaultProps = {
  color: "steelblue",
};

Button.prototype = {
  text: Propstypes.string,
  color: Propstypes.string,
  onClick: Propstypes.func,
};

export default Button;
