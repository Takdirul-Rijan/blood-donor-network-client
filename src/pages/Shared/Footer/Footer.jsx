import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-red-500">BloodConnect</h2>
          <p className="text-sm mt-2">
            A platform connecting life-saving donors with patients in need.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-red-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donation-requests" className="hover:text-red-400">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-red-400">
                Search Donors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Contact Us</h3>
          <p className="text-sm">📞 +880 1234 567 890</p>
          <p className="text-sm">📧 support@bloodcare.com</p>
          <p className="text-sm mt-2">Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
