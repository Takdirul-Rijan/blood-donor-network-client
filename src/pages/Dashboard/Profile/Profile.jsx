import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
      bloodGroup: "",
      district: "",
      upazila: "",
    },
  });

  const avatarValue = watch("avatar");

  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(
            user.email
          )}`
        );
        const data = res.data;

        if (isMounted) {
          reset({
            name: data.name || "",
            email: data.email || "",
            avatar: data.avatar || "",
            bloodGroup: data.bloodGroup || "",
            district: data.district || "",
            upazila: data.upazila || "",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        if (isMounted) {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.response?.data?.message || "Failed to load profile data",
            confirmButtonColor: "#d32f2f",
          });
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [user?.email, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(
          data.email
        )}`,
        {
          name: data.name,
          avatar: data.avatar,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#d32f2f",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#d32f2f",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl bg-white shadow-lg rounded-xl p-6 mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">My Profile</h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary btn-sm px-4 py-2 text-white font-medium rounded-md"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`btn btn-success btn-sm px-4 py-2 text-white font-medium rounded-md ${
              isSubmitting ? "bg-green-400 cursor-not-allowed" : "bg-green-600"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      <div className="flex justify-center mb-6">
        {avatarValue ? (
          <img
            src={avatarValue}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover shadow-md"
            onError={(e) => (e.target.src = "/placeholder-avatar.png")}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shadow-md">
            No Avatar
          </div>
        )}
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            disabled={!isEditing}
            className={`input input-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <input
          type="email"
          {...register("email")}
          disabled
          className="input input-bordered w-full px-4 py-2 rounded-md bg-gray-100 cursor-not-allowed border border-gray-300"
          placeholder="Email"
        />

        <input
          type="text"
          {...register("avatar")}
          disabled={!isEditing}
          className="input input-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Avatar URL"
        />

        <div>
          <select
            {...register("bloodGroup", { required: "Blood group is required" })}
            disabled={!isEditing}
            className={`select select-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.bloodGroup ? "select-error" : ""
            }`}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("district", { required: "District is required" })}
            disabled={!isEditing}
            className={`input input-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.district ? "input-error" : ""
            }`}
            placeholder="District"
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("upazila", { required: "Upazila is required" })}
            disabled={!isEditing}
            className={`input input-bordered w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.upazila ? "input-error" : ""
            }`}
            placeholder="Upazila"
          />
          {errors.upazila && (
            <p className="text-red-500 text-sm">{errors.upazila.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
