import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";

import {
  FaWarehouse,
  FaBoxOpen,
  FaPlusCircle,
  FaCalendarAlt,
  FaClock,
  FaFilter,
  FaHistory,
} from "react-icons/fa";

function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  let { bid } = useParams();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `/API/owner/business/${bid}/manage/inventory/get-products`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setAllProducts(res.data.data);
      }

      const res2 = await axios.get(
        `/API/owner/business/${bid}/manage/inventory`,
        {
          withCredentials: true,
        }
      );

      if (res2.data.isToken) {
        setHistory(res2.data.data);
      }
    }

    getData();
  }, []);

  const handleStartDate = async (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = async (e) => {
    setEndDate(e.target.value);
  };

  const addInventory = () => {
    navigate(`${location.pathname}/add`);
  };

  const handleFilter = () => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        alert("Start date cannot be after end date.");
        return;
      }
      async function filterSale() {
        const res = await axios.get(
          `/API/owner/business/${bid}/manage/inventory/filter`,
          {
            params: { startDate, endDate },
            withCredentials: true,
          }
        );

        if (res.data.isToken) {
          setHistory(res.data.data);
        } else {
          alert(res.data.message);
        }
      }
      filterSale();
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader />
        <div className="min-h-screen bg-gray-50 px-6 py-8">
          {/* Added pl-6 for left padding */}
          <div className="pl-6">
            {/* Inventory Title */}
            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3 mb-8">
              <FaWarehouse className="text-blue-600 text-4xl" />
              Inventory
            </h2>

            {/* Available Stock */}
            <h3 className="text-2xl font-semibold text-green-700 flex items-center gap-2 mb-4">
              <FaBoxOpen />
              Available Stock
            </h3>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {allProducts.map((pdct, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white shadow hover:shadow-md transition"
                >
                  <FaBoxOpen className="text-indigo-600 text-2xl" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {pdct.name}
                    </h4>
                    <p className="text-sm text-gray-500">Stock: {pdct.stock}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Filter Row */}
            <div className="flex flex-wrap items-end gap-4 mb-10">
              {/* Start Date */}
              <div className="flex flex-col w-40">
                <label
                  htmlFor="start-date"
                  className="text-sm text-gray-700 font-medium mb-1"
                >
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate || ""}
                  onChange={handleStartDate}
                  max={new Date().toISOString().split("T")[0]}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 text-gray-700"
                  style={{ textAlign: "left" }}
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col w-40">
                <label
                  htmlFor="end-date"
                  className="text-sm text-gray-700 font-medium mb-1"
                >
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate || ""}
                  onChange={handleEndDate}
                  max={new Date().toISOString().split("T")[0]}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 text-gray-700"
                  style={{ textAlign: "left" }}
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={handleFilter}
                className="h-10 px-4 bg-blue-600 text-white rounded-md text-sm font-medium shadow hover:bg-blue-700"
              >
                Filter
              </button>

              {/* Clear Button */}
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  window.location.reload();
                }}
                className="flex items-center gap-1 px-2 py-2 text-gray-500 text-sm hover:text-black"
              >
                ❌ Clear
              </button>

              {/* New Inventory Button - Right Aligned */}
              <button
                onClick={addInventory}
                className="ml-auto flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-medium shadow hover:from-blue-700 hover:to-indigo-700"
              >
                <FaPlusCircle /> New Inventory
              </button>
            </div>

            {/* Inventory History */}
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaHistory className="text-blue-600" />
              Inventory History
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((h, index) => {
                const dateObj = new Date(h.createdAt);
                const date = dateObj.toLocaleDateString("en-IN");
                const time = dateObj.toLocaleTimeString();

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                      <FaCalendarAlt className="text-blue-500" />
                      {date}, {time}
                    </div>
                    <div className="space-y-1 text-gray-800 text-sm">
                      {h.history.map((h1, idx) => (
                        <p key={idx} className="flex items-center gap-1">
                          <FaBoxOpen className="text-indigo-500" />
                          <span className="font-medium">{h1.name}</span>:{" "}
                          {h1.stock}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
