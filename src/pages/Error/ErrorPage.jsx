import React from "react";
import errorImage from "../../assets/error.svg";
import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <img src={errorImage} alt="Error" className="w-74 mb-6" />
      <div className="text-red-600 text-6xl mb-4 flex justify-center">
        <FaExclamationCircle />
      </div>

      <Link
        to="/"
        className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
      <p className="mt-6 text-gray-600 text-sm">
        If the problem persists, contact support: support@bloodnetwork.com
      </p>
    </div>
  );
};

export default ErrorPage;
