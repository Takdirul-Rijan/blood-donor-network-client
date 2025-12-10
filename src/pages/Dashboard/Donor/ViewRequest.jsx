import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { GridLoader } from "react-spinners";

const ViewRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: request = {}, isLoading } = useQuery({
    queryKey: ["singleRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <GridLoader color="#e63946" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Donation Request Details
      </h1>

      <div className="space-y-4">
        <p>
          <span className="font-bold">Patient Name:</span>{" "}
          {request.patientName || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Blood Group:</span>{" "}
          {request.bloodGroup || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Needed Date:</span>{" "}
          {request.neededDate || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Needed Time:</span>{" "}
          {request.neededTime || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">District:</span>{" "}
          {request.district || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Upazila:</span>{" "}
          {request.upazila || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Reason:</span>{" "}
          {request.reason || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Phone:</span>{" "}
          {request.phone || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Notes:</span>{" "}
          {request.notes || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Status:</span>{" "}
          <span className="font-semibold capitalize">
            {request.status || "pending"}
          </span>
        </p>

        <p>
          <span className="font-bold">Requester Name:</span>{" "}
          {request.requesterName || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Requester Email:</span>{" "}
          {request.requesterEmail || "Not Provided"}
        </p>

        <p>
          <span className="font-bold">Created At:</span>{" "}
          {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          to="/dashboard/my-requests"
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back to My Requests
        </Link>

        <Link
          to={`/dashboard/edit-request/${id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Request
        </Link>
      </div>
    </div>
  );
};

export default ViewRequest;
