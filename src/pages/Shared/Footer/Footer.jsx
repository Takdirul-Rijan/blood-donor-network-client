import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-11/12 mx-auto bg-red-600 text-white mt-16 px-6 py-10">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">BloodConnect</h2>
          <p className="text-white/90 leading-relaxed">
            Our mission is to connect donors with those in need, save lives, and
            build a trusted blood donation community.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
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
              <a href="/about" className="hover:text-red-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-200">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="mb-2">📞 +880 1300 000000</p>
          <p className="mb-2">📧 support@bloodnetwork.com</p>
          <p>📍 Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
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

      <div className="mt-10 border-t border-red-500 pt-4 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
