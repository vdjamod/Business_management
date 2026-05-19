import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";

import {
  FaWarehouse,
  FaBoxOpen,
  FaPlusCircle,
  FaCalendarAlt,
  FaHistory,
  FaFilter,
  FaSearch,
  FaBuilding,
  FaBoxes,
  FaRegListAlt
} from "react-icons/fa";

function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [allProducts, setAllProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [activeFilters, setActiveFilters] = useState({ name: "", sku: "" });
  const [branch, setBranch] = useState("Ahmedabad (Main)");
  const [visibleCount, setVisibleCount] = useState(6);
  
  let { bid } = useParams();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(
        `http://localhost:3000/owner/business/${bid}/manage/inventory/get-products`,
        {
          withCredentials: true,
        }
      );

      if (res.data.isToken) {
        setAllProducts(res.data.data);
      }

      const res2 = await axios.get(
        `http://localhost:3000/owner/business/${bid}/manage/inventory`,
        {
          withCredentials: true,
        }
      );

      if (res2.data.isToken) {
        setHistory(res2.data.data);
      }
    }

    getData();
  }, [bid]);

  const addInventory = () => {
    navigate(`${location.pathname}/add`);
  };

  const handleApplyFilters = () => {
    setActiveFilters({
      name: nameFilter,
      sku: skuFilter
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((pdct) => {
      const matchesName = pdct.name.toLowerCase().includes(activeFilters.name.toLowerCase());
      
      // Mock SKU generation matching the catalog
      let mockSku = "CH-MAC-35W";
      const nameLower = pdct.name.toLowerCase();
      if (nameLower.includes("iphone 14")) mockSku = "IP-14";
      else if (nameLower.includes("iphone 15")) mockSku = "IP-15";
      else if (nameLower.includes("iphone 13")) mockSku = "IP-13";
      else if (nameLower.includes("20w charger")) mockSku = "CH-IP-20W";
      else if (nameLower.includes("m3")) mockSku = "MBA-M3";
      else if (nameLower.includes("m4")) mockSku = "MBA-M4";
      else mockSku = `SKU-${pdct.name.substring(0, 3).toUpperCase()}`;

      const matchesSku = mockSku.toLowerCase().includes(activeFilters.sku.toLowerCase());

      return matchesName && matchesSku;
    });
  }, [allProducts, activeFilters]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader />
        
        <div className="min-h-screen bg-slate-50/50 rounded-[2.5rem] mt-6 border border-slate-100 shadow-sm px-6 py-8 md:px-10">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FaWarehouse size={20} />
                </div>
                Inventory
              </h2>
              <p className="text-xs text-slate-500 mt-1 pl-1">Track stock levels and transaction history.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              {/* Branch Selector */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm">
                <FaBuilding className="text-slate-400" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="bg-transparent focus:outline-none border-none pr-6 cursor-pointer"
                >
                  <option value="Ahmedabad (Main)">Ahmedabad (Main)</option>
                  <option value="Gandhinagar Branch">Gandhinagar Branch</option>
                </select>
              </div>

              {/* Add Transaction Button */}
              <button
                onClick={addInventory}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-300 ml-2"
              >
                <FaPlusCircle /> + New Transaction
              </button>
            </div>
          </div>

          {/* Product Stock Main Card Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm mb-10">
            
            {/* Inner Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <FaBoxes size={14} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Product Stock</h3>
                <p className="text-[10px] text-slate-450">Available quantity per product</p>
              </div>
            </div>

            {/* In-Card Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <FaSearch size={12} />
                </span>
                <input
                  type="text"
                  placeholder="Product name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 py-2.5 pl-10 pr-4 text-slate-900 shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900 sm:text-xs"
                />
              </div>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <FaSearch size={12} />
                </span>
                <input
                  type="text"
                  placeholder="SKU"
                  value={skuFilter}
                  onChange={(e) => setSkuFilter(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200/80 py-2.5 pl-10 pr-4 text-slate-900 shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900 sm:text-xs"
                />
              </div>

              <button
                onClick={handleApplyFilters}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all duration-300 h-[38px] w-24 md:w-auto"
              >
                Apply
              </button>
            </div>

            {/* Grid of Product Cards */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 font-sans">
                  {filteredProducts.slice(0, visibleCount).map((pdct, index) => {
                    const nameLower = pdct.name.toLowerCase();
                    let mockSku = "CH-MAC-35W";
                    let mockPid = 29;

                    if (nameLower.includes("iphone 14")) {
                      mockSku = "IP-14";
                      mockPid = 10;
                    } else if (nameLower.includes("iphone 15")) {
                      mockSku = "IP-15";
                      mockPid = 11;
                    } else if (nameLower.includes("iphone 13")) {
                      mockSku = "IP-13";
                      mockPid = 9;
                    } else if (nameLower.includes("20w charger")) {
                      mockSku = "CH-IP-20W";
                      mockPid = 28;
                    } else if (nameLower.includes("m3")) {
                      mockSku = "MBA-M3";
                      mockPid = 14;
                    } else if (nameLower.includes("m4")) {
                      mockSku = "MBA-M4";
                      mockPid = 15;
                    } else {
                      mockSku = `SKU-${pdct.name.substring(0, 3).toUpperCase()}`;
                      mockPid = index + 100;
                    }

                    return (
                      <div
                        key={index}
                        className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h4 className="text-base font-black text-slate-900 leading-tight">
                              {pdct.name}
                            </h4>
                            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider font-mono mt-1">
                              # PID: {mockPid} &nbsp; # SKU: {mockSku}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                            <FaBoxOpen size={13} />
                          </div>
                        </div>

                        {/* Stock Quantity Row */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-slate-450">
                            <FaBoxes size={11} className="text-slate-400" />
                            Stock
                          </span>
                          <span className="text-emerald-600 text-sm font-black font-mono">
                            {pdct.stock}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {filteredProducts.length > visibleCount && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="border border-slate-200/80 hover:bg-slate-50 text-slate-600 font-bold px-6 py-2 rounded-xl text-xs transition-all duration-300 shadow-sm"
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-slate-450 font-medium">
                No products found matching filters.
              </div>
            )}
          </div>

          {/* Inventory Transactions History Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm">
            
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <FaRegListAlt size={13} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Inventory Transactions</h3>
                <p className="text-[10px] text-slate-450">Track stock in and stock out activities</p>
              </div>
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                {history.map((h, index) => {
                  const dateObj = new Date(h.createdAt);
                  const date = dateObj.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });
                  const time = dateObj.toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit"
                  });

                  return (
                    <div
                      key={index}
                      className="bg-white border border-slate-200/70 rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-3.5 text-slate-500 text-xs font-bold font-mono">
                        <FaCalendarAlt className="text-indigo-500" size={11} />
                        {date}, {time}
                      </div>
                      <div className="space-y-2 border-t border-slate-50 pt-3">
                        {h.history.map((h1, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs font-semibold text-slate-700">
                            <span className="flex items-center gap-1.5">
                              <FaBoxOpen className="text-indigo-500" size={11} />
                              {h1.name}
                            </span>
                            <span className="font-bold font-mono bg-slate-50 border border-slate-100 rounded-md px-2 py-0.5 text-slate-900">
                              {h1.stock} units
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-450 font-medium">
                No recent transaction history recorded.
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Inventory;
