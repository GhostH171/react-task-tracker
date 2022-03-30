import React, { useContext } from "react";
import { useAppContext } from "../context/ContextApp";

const Errorpage = () => {
  const value = useAppContext();
  console.log(value);
  return <div>ERROR! PAGE NOT FOUND</div>;
};

export default Errorpage;
