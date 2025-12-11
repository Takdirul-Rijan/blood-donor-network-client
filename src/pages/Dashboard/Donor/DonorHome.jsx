import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";

const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: recentRequests = [], refetch } = useQuery({
    queryKey: ["recentRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/recent?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/requests/status/${id}`, { status: newStatus });
      Swal.fire("Updated!", "Donation status updated", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-amber-600">
          {dbUser?.name} <br />
        </span>
        <span className="text-xl text-green-600">
          Welcome to BloodConnect 💐
        </span>{" "}
        <br />
        <span className="text-xl text-green-600">
          Thank you for bringing hope and life to others
        </span>
      </h1>

      {recentRequests.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>

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
                {recentRequests.map((req) => (
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
                        onClick={async () => {
                          const confirm = await Swal.fire({
                            title: "Are you sure?",
                            text: "This request will be deleted!",
                            icon: "warning",
                            showCancelButton: true,
                          });

                          if (confirm.isConfirmed) {
                            await axiosSecure.delete(`/requests/${req._id}`);
                            Swal.fire("Deleted!", "", "success");
                            refetch();
                          }
                        }}
                        className="px-3 py-1  mt-2 sm:mt-0 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>

                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="px-3 py-1 mt-2 bg-purple-600 text-white rounded"
                          >
                            Done
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                            className="px-3 py-1 bg-black text-white rounded mt-2"
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

          <Link
            to="/dashboard/my-donation-requests"
            className="mt-5 inline-block bg-red-600 text-white px-4 py-2 rounded"
          >
            View My All Requests
          </Link>
        </>
      )}
    </div>
  );
};

export default DonorHome;
