import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { ScaleLoader } from "react-spinners";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  const queryKey = ["myRequests", user?.email, page, limit, statusFilter];

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("email", user?.email);
      params.append("page", page);
      params.append("limit", limit);
      if (statusFilter) params.append("status", statusFilter);

      const res = await axiosSecure.get(`/requests/all?${params.toString()}`);
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const requests = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted!",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/requests/${id}`);
      Swal.fire("Deleted!", "", "success");
      // If last item on page deleted and page > 1, move back a page
      if (requests.length === 1 && page > 1) setPage((p) => p - 1);
      else refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to delete request", "error");
    }
  };

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
      <h1 className="text-3xl font-bold mb-6">My Donation Requests</h1>

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

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Showing page {page} of {totalPages} — {total} requests
          </span>
        </div>
      </div>

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
                <td className="border p-2 space-x-2">
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/dashboard/request/${req._id}`}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-3 py-1 mt-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>

                  {req.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, "done")}
                        className="px-3 py-1 bg-purple-600 text-white rounded"
                      >
                        Done
                      </button>

                      <button
                        onClick={() => handleStatusChange(req._id, "canceled")}
                        className="px-3 py-1 bg-black text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
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

export default MyDonationRequests;
