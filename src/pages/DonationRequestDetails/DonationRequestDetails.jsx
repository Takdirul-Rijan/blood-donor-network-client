import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const request = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleConfirmDonation = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosSecure.patch(`/requests/status/${request._id}`, {
        status: "inprogress",
        donorEmail: user?.email,
      });

      Swal.fire("Success!", "Donation started successfully.", "success");

      setShowModal(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update donation status.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Donation Request Details
      </h1>

      <div className="bg-lime-50 shadow p-6 rounded-lg ">
        <h2 className="text-xl font-bold mb-4">
          Recipient: {request.patientName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Requester Name:</strong> {request.requesterName}
          </p>
          <p>
            <strong>Requester Email:</strong> {request.requesterEmail}
          </p>

          <p>
            <strong>District:</strong> {request.district}
          </p>
          <p>
            <strong>Upazila:</strong> {request.upazila}
          </p>

          <p>
            <strong>Hospital:</strong> {request.hospitalName}
          </p>
          <p>
            <strong>Address:</strong> {request.address}
          </p>

          <p>
            <strong>Blood Group:</strong>{" "}
            <span className="text-red-600 font-semibold">
              {request.bloodGroup}
            </span>
          </p>
          <p>
            <strong>Donation Date:</strong> {request.neededDate}
          </p>
          <p>
            <strong>Donation Time:</strong> {request.neededTime}
          </p>

          <p className="md:col-span-2">
            <strong>Reason:</strong> {request.reason}
          </p>

          <p>
            <strong>Phone:</strong> {request.phone}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="font-semibold uppercase">{request.status}</span>
          </p>
        </div>

        {request.status === "pending" && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-red-600 text-white px-5 py-2 rounded font-semibold"
          >
            Donate
          </button>
        )}
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
            <h2 className="text-xl font-bold mb-4 text-center">
              Confirm Donation
            </h2>

            <form onSubmit={handleConfirmDonation} className="space-y-4">
              <div>
                <label className="font-semibold">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="font-semibold">Donor Email</label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded font-semibold"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
