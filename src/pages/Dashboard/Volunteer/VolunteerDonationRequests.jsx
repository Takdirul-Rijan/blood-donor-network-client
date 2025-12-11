import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ScaleLoader } from "react-spinners";

const VolunteerDonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const queryKey = ["volunteerRequests", page, limit, statusFilter];

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);

      if (statusFilter !== "") {
        params.append("status", statusFilter); // FIXED
      }

      const res = await axiosSecure.get(
        `/admin/requests/all?${params.toString()}`
      );

      return res.data;
    },
    keepPreviousData: true,
  });

  const requests = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/requests/status/${id}`, { status: newStatus });
      Swal.fire("Updated!", "Donation status updated", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ScaleLoader color="#e63946" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Donation Requests</h1>

      {/* Filter */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="font-semibold">Filter status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="pending">pending</option>
            <option value="inprogress">inprogress</option>
            <option value="done">done</option>
            <option value="canceled">canceled</option>
          </select>
        </div>

        <span className="text-sm text-gray-600">
          Showing page {page} of {totalPages} — {total} requests
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Recipient</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Blood Group</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  No donation requests found.
                </td>
              </tr>
            )}

            {requests.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="border p-2">{req.recipientName}</td>
                <td className="border p-2">{req.recipientLocation}</td>
                <td className="border p-2">{req.donationDate}</td>
                <td className="border p-2">{req.donationTime}</td>
                <td className="border p-2">{req.bloodGroup}</td>

                <td className="border p-2 font-semibold">
                  {req.donationStatus}
                </td>

                <td className="border p-2">
                  <div className="flex flex-wrap justify-center gap-2">
                    {req.donationStatus === "pending" && (
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, "inprogress")
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded w-24"
                      >
                        Start
                      </button>
                    )}

                    {req.donationStatus === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusChange(req._id, "done")}
                          className="px-3 py-1 bg-purple-600 text-white rounded w-24"
                        >
                          Done
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "canceled")
                          }
                          className="px-3 py-1 bg-black text-white rounded w-24"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded ${
                p === page ? "bg-gray-800 text-white" : ""
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VolunteerDonationRequests;
