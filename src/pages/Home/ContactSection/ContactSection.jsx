import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !message) {
      return Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill out all fields before submitting.",
        confirmButtonColor: "#dc2626",
      });
    }

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you shortly.",
      confirmButtonColor: "#dc2626",
    });

    e.target.reset();
  };

  return (
    <section className="w-11/12 mx-auto py-14 bg-red-50 -mt-8">
      <div className="grid md:grid-cols-2 gap-10 items-center p-5">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-700">
            Contact With Our Support Team
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Have questions about donating blood, verification, or finding
            donors? Our support team is available 24/7 to assist you with quick
            help. Your trust and comfort matter to us.
          </p>

          <div className="space-y-3">
            <p className="text-lg font-semibold">
              📞 Hotline: <span className="text-red-600">+880 1300 000000</span>
            </p>

            <p className="text-lg font-semibold">
              📧 Email:{" "}
              <span className="text-red-600">support@bloodconnect.com</span>
            </p>

            <p className="text-lg font-semibold">
              📍 Office: <span className="text-red-600">Dhaka, Bangladesh</span>
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <input
            name="name"
            required
            className="input input-bordered w-full mb-4"
            placeholder="Your Name"
          />

          <input
            name="email"
            type="email"
            required
            className="input input-bordered w-full mb-4"
            placeholder="Your Email"
          />

          <textarea
            name="message"
            required
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Your Message"
            rows="5"
          ></textarea>

          <button className="btn btn-primary hover:bg-red-700 text-white w-full">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
