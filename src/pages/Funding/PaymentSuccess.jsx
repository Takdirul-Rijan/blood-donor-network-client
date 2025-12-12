import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const axiosSecure = useAxiosSecure();

  const name = params.get("name");
  const email = params.get("email");
  const amount = params.get("amount");
  const sessionId = params.get("session_id");

  const hasSent = useRef(false);

  useEffect(() => {
    if (!sessionId || hasSent.current) return;

    hasSent.current = true;

    axiosSecure.post("/fundings", {
      name,
      email,
      amount,
      sessionId,
    });
  }, [sessionId, axiosSecure, name, email, amount]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for your support</p>

      <a className="mt-6 btn btn-primary" href="/funding">
        Back to Funding Page
      </a>
    </div>
  );
};

export default PaymentSuccess;
