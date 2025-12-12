import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

const SearchDonors = () => {
  const axiosSecure = useAxiosSecure();
  const geoData = useLoaderData();

  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);

  const selectedDistrict = geoData.find((item) => item.district === district);

  const handleSearch = async () => {
    if (!bloodGroup && !district && !upazila) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select at least one field to search!",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const params = {
        bloodGroup: bloodGroup || undefined,
        district: district || undefined,
        upazila: upazila || undefined,
      };

      const res = await axiosSecure.get("/donors/search", { params });

      setDonors(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Search failed",
        text: "Something went wrong while searching for donors.",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleDownloadPDF = () => {
    if (donors.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No data",
        text: "There are no donors to download.",
        confirmButtonText: "OK",
      });
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Donor List", 105, 20, null, null, "center");

    let y = 30;

    donors.forEach((donor, index) => {
      doc.setFontSize(12);
      doc.text(`Name: ${donor.name}`, 20, y);
      doc.text(`Email: ${donor.email}`, 20, y + 6);
      doc.text(`Blood Group: ${donor.bloodGroup}`, 20, y + 12);
      doc.text(`District: ${donor.district}`, 20, y + 18);
      doc.text(`Upazila: ${donor.upazila}`, 20, y + 24);
      y += 36;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("donors.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Donors</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white shadow p-4 rounded-lg border">
        <select
          className="border p-2 rounded"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
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

        <select
          className="border p-2 rounded"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila("");
          }}
        >
          <option value="">Select District</option>

          {geoData &&
            geoData.map((item) => (
              <option key={item.district} value={item.district}>
                {item.district}
              </option>
            ))}
        </select>

        <select
          className="border p-2 rounded"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          disabled={!district}
        >
          <option value="">Select Upazila</option>

          {selectedDistrict &&
            selectedDistrict.upazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-red-600 text-white rounded p-2 font-semibold"
        >
          Search
        </button>
      </div>

      {donors.length > 0 && (
        <div className="text-right mt-4">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white rounded p-2 font-semibold"
          >
            Download PDF
          </button>
        </div>
      )}

      <div className="mt-8">
        {!searched && (
          <p className="text-center text-gray-500">
            Fill one or more fields and click search to view donors.
          </p>
        )}

        {searched && donors.length === 0 && (
          <p className="text-center text-red-500 font-semibold">
            No donors found!
          </p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className=" p-4 rounded shadow-lg bg-lime-50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={donor.avatar}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{donor.name}</h2>
                    <p className="text-sm">{donor.email}</p>
                    <p className="text-sm font-semibold text-red-600">
                      {donor.bloodGroup}
                    </p>
                  </div>
                </div>

                <div className="mt-2 text-sm">
                  <p>
                    <strong>District:</strong> {donor.district}
                  </p>
                  <p>
                    <strong>Upazila:</strong> {donor.upazila}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
