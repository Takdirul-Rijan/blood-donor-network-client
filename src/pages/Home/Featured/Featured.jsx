import { motion } from "framer-motion";
import { HeartPulse, MapPin, Users } from "lucide-react";

const Featured = () => {
  const features = [
    {
      icon: <HeartPulse className="w-10 h-10 text-red-600" />,
      title: "Why Donate?",
      desc: "One donation can save up to three lives. Your contribution makes a real impact.",
    },
    {
      icon: <Users className="w-10 h-10 text-red-600" />,
      title: "Trusted Donor Network",
      desc: "A verified community of active donors and volunteers ready to help.",
    },
    {
      icon: <MapPin className="w-10 h-10 text-red-600" />,
      title: "Find Nearby Donors",
      desc: "Search donors by blood group, district, and upazila instantly.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto py-10 px-3 bg-red-50 rounded-2xl -mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        What We Offer
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
