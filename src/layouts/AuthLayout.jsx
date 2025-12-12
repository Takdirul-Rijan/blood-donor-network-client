import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import NavBar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="bg-red-50 min-h-screen flex flex-col">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
