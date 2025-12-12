import React from "react";
import {
  FaHandsHelping,
  FaUsers,
  FaHeartbeat,
  FaClinicMedical,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">
        About Us
      </h1>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-12">
        <p className="text-xl text-gray-800 leading-relaxed text-center">
          <span className="font-bold text-red-600">BloodConnect</span> is a
          community-driven platform dedicated to saving lives. We connect
          willing donors with recipients in need, ensuring safe, timely, and
          reliable blood donation processes. Join us and make a real impact in
          your community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl text-blue-500" />
            <h2 className="text-2xl font-semibold">Our Community</h2>
          </div>
          <p className="text-gray-700">
            We foster a caring network of donors, volunteers, and healthcare
            providers, working together to save lives.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FaHeartbeat className="text-4xl text-red-500" />
            <h2 className="text-2xl font-semibold">Life-Saving Impact</h2>
          </div>
          <p className="text-gray-700">
            Every donation counts. Our platform ensures that blood reaches those
            who need it most, fast and efficiently.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FaHandsHelping className="text-4xl text-green-500" />
            <h2 className="text-2xl font-semibold">Volunteer Support</h2>
          </div>
          <p className="text-gray-700">
            Volunteers play a vital role in organizing donation drives, helping
            donors, and coordinating logistics.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FaClinicMedical className="text-4xl text-purple-500" />
            <h2 className="text-2xl font-semibold">Healthcare Integration</h2>
          </div>
          <p className="text-gray-700">
            We work closely with hospitals and clinics to ensure safe and
            verified blood donation processes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
