import { motion } from "framer-motion";
import { UserCheck, Heart, MapPin, Calendar, Users } from "lucide-react";
import { use } from "react";

const iconMap = { UserCheck, Heart, MapPin, Calendar, Users };

const HowItWorks = ({ stepsPromise }) => {
  const steps = use(stepsPromise);
  //   console.log(steps);

  return (
    <section className="w-11/12 mx-auto py-16 px-3 bg-red-50 shadow-lg -mt-8">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        Donation Process
      </motion.h2>

      <div className="grid md:grid-cols-5 gap-8">
        {steps.map((step, idx) => {
          const StepIcon = iconMap[step.icon];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="mb-4">
                {StepIcon && <StepIcon className="w-10 h-10 text-red-600" />}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
