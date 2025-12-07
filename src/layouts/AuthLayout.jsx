import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import NavBar from "../pages/Shared/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <div className=" bg-red-50">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
