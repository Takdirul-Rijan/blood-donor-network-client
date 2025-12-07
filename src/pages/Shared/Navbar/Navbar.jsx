import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          timer: 2500,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests">Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to="/search">Search Donors</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="w-11/12 mx-auto navbar bg-base-100 shadow-sm p-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <Link to={"/"} className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center bg-neutral rounded-full">
            <Logo />
          </div>
          <h2 className="text-xl font-bold">
            <span className="text-red-600">Blood</span>
            <span className="text-gray-900">Connect</span>
          </h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {user ? (
          <a onClick={handleLogOut} className="btn btn-secondary w-32">
            Log Out
          </a>
        ) : (
          <Link className="btn btn-secondary w-32" to="/login">
            Log In
          </Link>
        )}

        <Link className="btn btn-primary w-32" to="/register">
          Join as Donor
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
