import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GiveFundModal from "../../components/Funding/GiveFundModal";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const [fundings, setFundings] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axiosSecure.get("/fundings").then((res) => setFundings(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Funding</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold"
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>User Name</th>
              <th>Email</th>
              <th>Amount (USD)</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {fundings.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td className="font-bold text-red-600">${f.amount}</td>
                <td>{new Date(f.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openModal && <GiveFundModal close={() => setOpenModal(false)} />}
    </div>
  );
};

export default FundingPage;
