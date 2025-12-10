import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const closeMenu = () => setOpenMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allUsers", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users", {
        params: { status: statusFilter || undefined, page, limit },
      });
      return res.data;
    },
  });

  const users = data?.users || [];
  const totalUsers = data?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const handleStatusChange = async (email, newStatus) => {
    try {
      await axiosSecure.patch(`/admin/users/status/${email}`, {
        status: newStatus,
      });
      Swal.fire("Success!", `User ${newStatus}`, "success");
      refetch();
      setOpenMenu(null);
    } catch (error) {
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosSecure.patch(`/admin/users/role/${email}`, {
        role: newRole,
      });
      Swal.fire("Success!", `User role updated to ${newRole}`, "success");
      refetch();
      setOpenMenu(null);
    } catch (error) {
      Swal.fire("Error!", "Failed to update role", "error");
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Users</h2>

      <div className="mb-4 flex gap-2 items-center">
        <span>Status Filter:</span>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">
                  <img
                    src={user.avatar || "/placeholder-avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 font-semibold">{user.status}</td>

                <td className="border p-2 relative">
                  <button
                    className="p-2 rounded hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent closing
                      setOpenMenu(openMenu === user._id ? null : user._id);
                    }}
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenu === user._id && (
                    <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded z-20">
                      {/* Status */}
                      {user.status === "active" ? (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(user.email, "blocked")
                          }
                        >
                          Block
                        </li>
                      ) : (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleStatusChange(user.email, "active")
                          }
                        >
                          Unblock
                        </li>
                      )}

                      {user.role !== "volunteer" && (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleRoleChange(user.email, "volunteer")
                          }
                        >
                          Make Volunteer
                        </li>
                      )}

                      {user.role !== "admin" && (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleRoleChange(user.email, "admin")}
                        >
                          Make Admin
                        </li>
                      )}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="px-2 py-1 border rounded">{page}</span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
