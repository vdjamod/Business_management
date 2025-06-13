import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";

import {
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaChartLine,
  FaRupeeSign,
  FaBullhorn,
  FaChartBar,
  FaPlusCircle,
  FaHistory,
  FaMoneyBillWave,
  FaBoxOpen,
} from "react-icons/fa";

function Sale() {
  let { id, bid } = useParams();
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const location = useLocation();

  const formatter = new Intl.NumberFormat("en-IN");

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `/API/owner/business/${bid}/manage/sale/getHistory`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setSaleProducts(res.data.data);
      }

      // if (res.status) {
      //   navigate(`/owner/business/${bid}/manage/sale`);
      // } else {
      //   alert("Failed to sale the product");
      // }
    }

    getData();
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        alert("Start date cannot be after end date.");
        return;
      }

      async function filterSale() {
        const res = await axios.get(
          `/API/owner/business/${bid}/manage/sale/filter`,
          {
            params: { startDate, endDate },
            withCredentials: true,
          }
        );

        if (res.data.isToken) {
          setSaleProducts(res.data.data);
        }
      }

      filterSale();
    }
  };
  // useEffect(() => {}, [startDate, endDate, id]);

  const handleStartDate = async (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = async (e) => {
    setEndDate(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader />
        <div className="min-h-screen bg-gray-50 px-6 py-8">
          <div className="pl-6">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3 mb-6">
              <FaChartBar className="text-blue-600 text-4xl" />
              Sales Information
            </h2>

            {/* Date Filter Row with Add Sale Button */}
            <div className="flex flex-wrap items-end gap-4 mb-8">
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

              {/* Add Sale Button */}
              <Link
                to={`/owner/business/${bid}/manage/sale/add`}
                className="ml-auto flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md font-medium shadow hover:from-blue-700 hover:to-indigo-700"
              >
                <FaPlusCircle /> Add Sale
              </Link>
            </div>

            {/* Sale Data */}
            <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FaHistory className="text-blue-600" />
              Sale History
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-6">
              {saleProducts.map((history, index) => {
                const isoString = history.createdAt;
                const dateObj = new Date(isoString);
                const date = dateObj.toLocaleDateString("en-IN");
                const time = dateObj.toLocaleTimeString();

                let totalCost = 0;
                let totalRevenue = 0;

                history.history.forEach((pdct) => {
                  totalCost += pdct.cost * pdct.quantity;
                  totalRevenue += pdct.revenue * pdct.quantity;
                });

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-2 mb-2 text-gray-700 text-sm">
                      <FaCalendarAlt className="text-blue-500" />
                      {date}, {time}
                    </div>

                    <div className="space-y-1 text-gray-800 text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <FaChartLine className="text-green-600" />
                        <span>
                          <strong>Revenue:</strong> ₹
                          {formatter.format(totalRevenue)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRupeeSign className="text-red-600" />
                        <span>
                          <strong>Cost:</strong> ₹{formatter.format(totalCost)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBullhorn className="text-orange-500" />
                        <span>
                          <strong>Marketing:</strong> ₹
                          {formatter.format(history.mcost)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-purple-500" />
                        <span>
                          <strong>Other:</strong> ₹
                          {formatter.format(history.ocost)}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-700 flex items-center gap-2 text-base mb-1">
                      <FaBoxOpen className="text-indigo-600" />
                      Products
                    </h4>

                    <ul className="list-disc ml-5 text-gray-700 text-sm space-y-1">
                      {history.history.map((product, idx) => {
                        const cost = product.cost * product.quantity;
                        const revenue = product.revenue * product.quantity;
                        return (
                          <li key={idx}>
                            <strong>{product.name}</strong>: {product.quantity}{" "}
                            unit(s) | ₹{formatter.format(cost)} ➔ ₹
                            {formatter.format(revenue)}
                          </li>
                        );
                      })}
                    </ul>
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

export default Sale;
