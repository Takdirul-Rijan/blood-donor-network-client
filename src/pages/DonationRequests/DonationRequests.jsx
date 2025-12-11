import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { ScaleLoader } from "react-spinners";
const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await axiosSecure.get("/admin/requests/all?status=pending");
        setRequests(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    loadRequests();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#e63946" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pending Blood Donation Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-center text-gray-500">
          No pending requests available.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {requests.map((req) => (
          <div key={req._id} className=" p-4 rounded shadow bg-lime-50">
            <h2 className="text-xl font-bold">{req.recipientName}</h2>

            <p className="text-sm mt-2">
              <strong>Location:</strong> {req.recipientLocation}
            </p>

            <p className="text-sm">
              <strong>Blood Group:</strong>{" "}
              <span className="text-red-600 font-semibold">
                {req.bloodGroup}
              </span>
            </p>

            <p className="text-sm">
              <strong>Date:</strong> {req.donationDate}
            </p>

            <p className="text-sm">
              <strong>Time:</strong> {req.donationTime || "Not Provided"}
            </p>

            <Link
              to={`/donation-request/${req._id}`}
              className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded font-semibold"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
