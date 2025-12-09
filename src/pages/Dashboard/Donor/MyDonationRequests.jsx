import React from "react";
import useMyRequests from "../../../hooks/useMyRequests";

const MyDonationRequests = () => {
  const { myRequests, isLoading } = useMyRequests();

  if (isLoading)
    return (
      <p className="text-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5 text-red-600">
        My Donation Requests
      </h2>

      {myRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-red-600 text-white">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Blood Group</th>
                <th>Needed Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {myRequests.map((req, idx) => (
                <tr key={req._id} className="border">
                  <td>{idx + 1}</td>
                  <td>{req.patientName}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.neededDate}</td>
                  <td className="text-green-600 font-semibold">Pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
