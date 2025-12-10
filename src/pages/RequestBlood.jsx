import { useLoaderData } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";

const RequestBlood = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);

    const districtData = loaderData.find((item) => item.district === district);
    if (districtData) {
      setUpazilas(districtData.upazilas);

      setValue("upazila", "");
    }
  };

  const onSubmit = async (data) => {
    const requestInfo = {
      ...data,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/requests", requestInfo);

      Swal.fire({
        icon: "success",
        title: "Blood Request Submitted!",
        text: "A donor will contact you soon.",
        confirmButtonText: "OK",
        showConfirmButton: true,
      });

      reset();
      setSelectedDistrict("");
      setUpazilas([]);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-5">
        Request Blood
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-semibold">Patient Name</label>
          <input
            {...register("patientName", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Needed Date</label>
          <input
            type="date"
            {...register("neededDate", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Needed Time</label>
          <input
            type="time"
            {...register("neededTime", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">District</label>
          <select
            {...register("district", { required: true })}
            onChange={handleDistrictChange}
            value={selectedDistrict}
            className="w-full border p-2 rounded"
          >
            <option value="">Select District</option>
            {loaderData.map((districtData) => (
              <option key={districtData.district} value={districtData.district}>
                {districtData.district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Upazila</label>
          <select
            {...register("upazila", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Reason for Request</label>
          <textarea
            {...register("reason", { required: true })}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Phone Number</label>
          <input
            {...register("phone", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea
            {...register("notes")}
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded font-bold hover:bg-red-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestBlood;
