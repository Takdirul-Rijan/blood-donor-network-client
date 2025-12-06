import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="w-11/12 mx-auto py-8">
      <div className="grid md:grid-cols-2 items-center gap-10 bg-gradient-to-r from-red-600 to-red-500 p-6 shadow-xl">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Donate Blood, Save Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 text-white/90 max-w-md"
          >
            Join our mission to help people in need. Connect donors, volunteers,
            and recipients to make blood donation easier and faster.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-red-50 transition"
            >
              Join as a Donor
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition"
            >
              Search Donors
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Blood Donation Illustration"
            className="w-64 md:w-80 drop-shadow-xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 150 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
