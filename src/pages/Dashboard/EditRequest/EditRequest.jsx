import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const EditRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      const data = res.data;

      setValue("patientName", data.patientName);
      setValue("bloodGroup", data.bloodGroup);
      setValue("neededDate", data.neededDate);
      setValue("neededTime", data.neededTime);
      setValue("district", data.district);
      setValue("upazila", data.upazila);
      setValue("reason", data.reason);
      setValue("phone", data.phone);
      setValue("notes", data.notes);
    });
  }, [id, axiosSecure, setValue]);

  const onSubmit = async (formData) => {
    try {
      await axiosSecure.put(`/requests/${id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Donation request updated successfully",
        confirmButtonText: "OK",
      }).then(() => {});
    } catch (err) {
      Swal.fire("Error!", "Failed to update donation request", "error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Donation Request</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="font-semibold">Patient Name</label>
          <input
            {...register("patientName", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Blood Group</label>
          <input
            {...register("bloodGroup", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Needed Date</label>
          <input
            type="date"
            {...register("neededDate", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Needed Time</label>
          <input
            type="time"
            {...register("neededTime", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">District</label>
          <input
            {...register("district", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Upazila</label>
          <input
            {...register("upazila", { required: true })}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Reason</label>
          <textarea
            {...register("reason")}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Phone</label>
          <input {...register("phone")} className="border p-2 w-full rounded" />
        </div>

        <div>
          <label className="font-semibold">Notes</label>
          <textarea
            {...register("notes")}
            className="border p-2 w-full rounded h-[42px]"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white p-3 rounded"
        >
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
