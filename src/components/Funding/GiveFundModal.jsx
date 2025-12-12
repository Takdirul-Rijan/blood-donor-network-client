import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const GiveFundModal = ({ close }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    const paymentInfo = {
      name: user.displayName,
      email: user.email,
      amount,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Give Funding</h2>

        <input
          type="number"
          placeholder="Enter amount (USD)"
          className="input input-bordered w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button className="btn" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveFundModal;
