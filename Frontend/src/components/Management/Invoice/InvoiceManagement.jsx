import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerHeader from "../../Owner/OwnerHeader";
import {
  FaFileInvoice,
  FaPlusCircle,
  FaPhone,
  FaCalendarAlt,
  FaBoxOpen,
  FaBuilding,
  FaSearch,
  FaCashRegister
} from "react-icons/fa";

export default function InvoiceManagement() {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [mobileSearch, setMobileSearch] = useState("");
  const [branch, setBranch] = useState("Ahmedabad (Main)");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeFilters, setActiveFilters] = useState({ mobile: "", branch: "Ahmedabad (Main)" });

  // Exquisite Mock Invoices from Screenshot
  const mockInvoices = [
    {
      id: "54",
      customer: "Vipul",
      phone: "8181818181",
      createdBy: "vdjamod",
      createdDate: "30 Mar 2026",
      createdTime: "04:59 pm",
      paidDate: "30 Mar 2026",
      paidTime: "04:59 pm",
      productName: "MacBook Air M4",
      qty: 1,
      paymentMethod: "CASH",
      isPaid: true
    },
    {
      id: "53",
      customer: "Vipul",
      phone: "8181818181",
      createdBy: "vdjamod",
      createdDate: "3 Mar 2026",
      createdTime: "09:50 pm",
      paidDate: null,
      paidTime: null,
      productName: "20w charger for iphone",
      qty: 2,
      paymentMethod: "ONLINE",
      isPaid: false
    },
    {
      id: "51",
      customer: "Vipul",
      phone: "8181818181",
      createdBy: "emp2",
      createdDate: "23 Feb 2026",
      createdTime: "02:53 pm",
      paidDate: "23 Feb 2026",
      paidTime: "02:53 pm",
      productName: "MacBook Air M3",
      qty: 1,
      paymentMethod: "CASH",
      isPaid: true
    },
    {
      id: "48",
      customer: "Vipul",
      phone: "8181818181",
      createdBy: "vdjamod",
      createdDate: "13 Feb 2026",
      createdTime: "06:08 pm",
      paidDate: "13 Feb 2026",
      paidTime: "06:08 pm",
      productName: "MacBook Air M3",
      qty: 1,
      paymentMethod: "CASH",
      isPaid: true
    },
    {
      id: "47",
      customer: "Vipul2",
      phone: "8160065665",
      createdBy: "vdjamod",
      createdDate: "13 Feb 2026",
      createdTime: "02:18 pm",
      paidDate: "13 Feb 2026",
      paidTime: "02:22 pm",
      productName: "20w charger for iphone",
      qty: 2,
      paymentMethod: "ONLINE",
      isPaid: true
    },
    {
      id: "46",
      customer: "pratham chauhan",
      phone: "8160062661",
      createdBy: "vdjamod",
      createdDate: "11 Feb 2026",
      createdTime: "04:07 pm",
      paidDate: "11 Feb 2026",
      paidTime: "04:07 pm",
      productName: "MacBook Air M4",
      qty: 1,
      paymentMethod: "CASH",
      isPaid: true
    }
  ];

  const handleApplyFilters = () => {
    setActiveFilters({
      mobile: mobileSearch,
      branch: branch
    });
  };

  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter((inv) => {
      const matchesMobile = inv.phone.includes(activeFilters.mobile) || inv.customer.toLowerCase().includes(activeFilters.mobile.toLowerCase());
      return matchesMobile;
    });
  }, [activeFilters]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <OwnerHeader />

        <div className="min-h-screen bg-slate-50/50 rounded-[2.5rem] mt-6 border border-slate-100 shadow-sm px-6 py-8 md:px-10 font-sans">

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <FaFileInvoice size={18} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-none">Invoice Management</h2>
                <p className="text-xs text-slate-500 mt-1.5">Track and manage your billing efficiently</p>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
            >
              + Create New Invoice
            </button>
          </div>

          {/* Filter Panel Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Search</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <FaPhone size={11} />
                  </span>
                  <input
                    type="text"
                    placeholder="Mobile Number..."
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-slate-900 text-xs shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Branch</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <FaBuilding size={11} />
                  </span>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="block w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-slate-900 text-xs shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900 cursor-pointer"
                  >
                    <option value="Ahmedabad (Main)">Ahmedabad (Main)</option>
                    <option value="Gandhinagar Branch">Gandhinagar Branch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 py-2.5 px-3 text-slate-900 text-xs shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 py-2.5 px-3 text-slate-900 text-xs shadow-sm focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
                />
              </div>

              <button
                onClick={handleApplyFilters}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all duration-300 w-full"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Invoice Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-[2rem] border border-slate-200/70 p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Information Row */}
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-xs shrink-0 font-mono">
                        #{inv.id}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">
                          {inv.customer}
                        </h4>
                        <span className="flex items-center gap-1 text-[10px] text-slate-450 font-bold mt-0.5 font-mono">
                          <FaPhone size={8} /> {inv.phone}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block bg-slate-50 border border-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                        Created by: {inv.createdBy}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold mt-1 font-mono">
                        Created: {inv.createdDate}, {inv.createdTime}
                      </p>
                      {inv.isPaid ? (
                        <span className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 font-mono">
                          Paid: {inv.paidDate}, {inv.paidTime}
                        </span>
                      ) : (
                        <span className="inline-block bg-rose-50 border border-rose-100 text-rose-600 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-1">
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Container */}
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 mt-5 flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/50 flex items-center justify-center text-slate-400 shrink-0">
                      <FaBoxOpen size={12} />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-800">{inv.productName}</h5>
                      <span className="text-[10px] text-slate-450 font-bold font-mono">Qty: {inv.qty}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Actions */}
                <div className="flex justify-between items-center border-t border-slate-100/70 pt-4 mt-5">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-md border ${inv.paymentMethod === "ONLINE"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                    : "bg-slate-100 border-slate-200 text-slate-650"
                    }`}>
                    {inv.paymentMethod}
                  </span>

                  <div className="flex gap-2">
                    <button className="bg-slate-50 border border-slate-200 text-slate-650 hover:bg-slate-100 font-bold px-4.5 py-1.5 rounded-xl text-[10px] transition-colors">
                      View
                    </button>
                    {!inv.isPaid && inv.paymentMethod === "ONLINE" && (
                      <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-1.5 rounded-xl text-[10px] shadow-sm transition-colors">
                        Pay Online
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
