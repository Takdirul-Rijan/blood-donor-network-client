import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const districtsData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [upazilas, setUpazilas] = useState([]);

  const handleDistrictChange = (districtName) => {
    const found = districtsData.find((d) => d.district === districtName);
    setUpazilas(found ? found.upazilas : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.status === "blocked") {
      Swal.fire("Blocked!", "You are not allowed to create requests.", "error");
      return;
    }

    const form = e.target;

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,

      patientName: form.patientName.value,
      district: form.district.value,
      upazila: form.upazila.value,

      hospitalName: form.hospitalName.value,
      address: form.address.value,

      bloodGroup: form.bloodGroup.value,
      neededDate: form.neededDate.value,
      neededTime: form.neededTime.value,

      reason: form.reason.value,

      phone: form.phone.value,

      status: "pending",
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/requests", requestData);

    if (res.data.success) {
      Swal.fire("Success!", "Donation request created!", "success");
      form.reset();
      setUpazilas([]);
      navigate("/dashboard");
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Donation Request</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="font-semibold">Requester Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Recipient Name</label>
          <input
            required
            name="patientName"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Recipient District</label>
          <select
            required
            name="district"
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select District</option>
            {districtsData.map((d) => (
              <option key={d.district} value={d.district}>
                {d.district}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Recipient Upazila</label>
          <select
            required
            name="upazila"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Hospital Name</label>
          <input
            required
            name="hospitalName"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Full Address</label>
          <input
            required
            name="address"
            type="text"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Blood Group</label>
          <select
            required
            name="bloodGroup"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Donation Date</label>
          <input
            required
            name="neededDate"
            type="date"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Donation Time</label>
          <input
            required
            name="neededTime"
            type="time"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Phone Number</label>
          <input
            required
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Request Message</label>
          <textarea
            required
            name="reason"
            className="w-full px-3 py-2 border rounded h-28"
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-semibold"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
