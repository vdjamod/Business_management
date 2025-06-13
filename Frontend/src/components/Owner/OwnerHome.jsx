import { useEffect, useState } from "react";
import axios from "axios";
import OwnerHeader from "./OwnerHeader";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaEdit, FaBuilding, FaTrash } from "react-icons/fa";

function OwnerHome() {
  const [businessData, setBusinessData] = useState([]);
  const [ownerData, setOwnerData] = useState("");

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:3000/owner/business`, {
        withCredentials: true,
      });

      if (res.data.isToken) {
        setBusinessData(res.data.business);
        setOwnerData(res.data.owner);
      }
    }
    getData();
  }, []);

  const handleDeleteBusiness = async (businessId) => {
    console.log(businessId);
    try {
      const res = await axios.delete(
        `http://localhost:3000/owner/business/${businessId}`,
        {
          withCredentials: true,
        }
      );

      if(res.data && res.data.success) {
        setBusinessData((prev) => prev.filter((b) => b._id != businessId));
      }

    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <OwnerHeader />

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full mt-12">
        {/* Welcome Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Welcome, <span className="text-blue-600">{ownerData.name}</span>
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Here’s your profile and business information.
        </p>

        {/* Profile Information */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-300 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Details
          </h2>
          <div className="space-y-2 text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Email:</span> {ownerData.email}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {ownerData.mobile}
            </p>
          </div>
          <div className="mt-6">
            <Link
              to={"/owner/edit"}
              className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-slate-800 px-5 py-2 rounded-lg focus:ring-2 focus:ring-slate-400 transition"
            >
              <FaEdit />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Businesses Section */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            Your Businesses
          </h2>

          {businessData.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {businessData.map((business, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-300 hover:shadow-xl transition"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FaBuilding className="text-blue-500" />
                    {business.name || "Unnamed Business"}
                  </h3>
                  <p className="text-gray-700 mb-4 text-base">
                    {business.description || "No description available."}
                  </p>
                  <p className="text-gray-800 mb-6">
                    <strong>Assets:</strong>{" "}
                    {business.assets || "Not specified"}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* 📝✂️ Group 1: Edit & Delete */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/owner/business/${business._id}/edit`}
                        className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 transition"
                      >
                        <FaEdit />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDeleteBusiness(business._id)}
                        className="inline-flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-300 transition"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>

                    {/* ⚙📊 Group 2: Manage & Analyze */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/owner/business/${business._id}/manage`}
                        className="inline-flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-300 transition"
                      >
                        <FaBuilding />
                        Manage
                      </Link>

                      <Link
                        to={`/owner/business/${business._id}/analyse`}
                        className="inline-flex items-center gap-2 text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-300 transition"
                      >
                        <FaBuilding />
                        Analyze
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-4 text-center text-lg">
              No businesses added yet. Start by adding your first business.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerHome;
