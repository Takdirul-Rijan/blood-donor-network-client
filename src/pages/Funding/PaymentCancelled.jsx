import React from "react";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>

      <a className="btn btn-primary mt-6" href="/funding">
        Back to Funding
      </a>
    </div>
  );
};

export default PaymentCancelled;
