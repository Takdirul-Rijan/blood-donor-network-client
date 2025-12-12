import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="w-11/12 mx-auto bg-red-600 text-white mt-12 px-6 py-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <Link to={"/"} className="text-xl font-bold">
              <span className="text-red-200">Blood</span>
              <span className="text-white">Connect</span>
            </Link>
          </div>
          <p className="text-white/90 text-sm leading-snug">
            Connecting donors with recipients safely and efficiently. Join our
            community and help save lives.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/donation-requests" className="hover:text-red-200">
                Donation Requests
              </a>
            </li>
            <li>
              <a href="/search" className="hover:text-red-200">
                Search Donors
              </a>
            </li>
            <li>
              <a href="/funding" className="hover:text-red-200">
                Give Fund
              </a>
            </li>
            <li>
              <a href="/about-us" className="hover:text-red-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-red-200">
                Contact
              </a>
            </li>
            {user ? (
              ""
            ) : (
              <li>
                <a href="/login" className="hover:text-red-200">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Contact</h3>
          <p className="text-sm mb-1">
            <FaPhone className="inline mr-2 text-red-50" /> +880 1300 000000
          </p>
          <p className="text-sm mb-1">
            <FaEnvelope className="inline mr-2 text-red-50" />{" "}
            support@bloodnetwork.com
          </p>
          <p className="text-sm">
            <FaMapMarkerAlt className="inline mr-2 text-red-50" /> Dhaka,
            Bangladesh
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Follow Us</h3>
          <div className="flex gap-3 text-lg">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-200"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-200"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-red-500 pt-2 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
