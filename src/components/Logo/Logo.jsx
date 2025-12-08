import React from "react";
import logo from "../../assets/logo-b.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="" />
    </Link>
  );
};

export default Logo;
