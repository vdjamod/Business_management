import { useEffect, useState } from "react";
import axios from "axios";
import OwnerHeader from "./OwnerHeader";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaHistory,
  FaChartLine,
  FaFileAlt,
  FaNetworkWired,
  FaComments,
  FaCoins,
  FaUsers,
  FaBoxOpen,
  FaTruck,
  FaFileInvoice,
  FaUserTie,
  FaTag,
  FaCrown,
  FaTasks,
  FaSearch,
  FaChevronRight,
  FaInfoCircle,
  FaCheckCircle,
  FaPlusCircle,
  FaBriefcase,
} from "react-icons/fa";

function OwnerHome() {
  const [businessData, setBusinessData] = useState([]);
  const [ownerData, setOwnerData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://localhost:3000/owner/business`, {
        withCredentials: true,
      });

      if (res.data.isToken) {
        setBusinessData(res.data.business || []);
        setOwnerData(res.data.owner || {});
      }
    }
    getData();
  }, []);

  // Determine Greeting based on time
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return "Good Morning,";
    if (hrs < 18) return "Good Afternoon,";
    return "Good Evening,";
  };

  const activeBusiness = businessData[0] || {
    name: "Apple Store",
    _id: "6a0c8d168e5aa630d5b2ee58",
    description: "Default retail store operations.",
  };
  const bid = activeBusiness._id;

  // Management Modules Configurations
  const modules = [
    {
      name: "Activity Logs",
      icon: <FaHistory size={16} className="text-slate-650" />,
      bg: "bg-slate-100",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Analytics",
      icon: <FaChartLine size={16} className="text-blue-500" />,
      bg: "bg-blue-50",
      route: `/owner/business/${bid}/analyse`,
    },
    {
      name: "Report Center",
      icon: <FaFileAlt size={16} className="text-teal-500" />,
      bg: "bg-teal-50",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Branches",
      icon: <FaNetworkWired size={16} className="text-cyan-500" />,
      bg: "bg-cyan-50",
      route: `/owner/business/${bid}/manage`,
    },

    {
      name: "Chat",
      icon: <FaComments size={16} className="text-sky-500" />,
      bg: "bg-sky-50",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Sales",
      icon: <FaCoins size={16} className="text-rose-500" />,
      bg: "bg-rose-50",
      route: `/owner/business/${bid}/manage/sale`,
    },
    {
      name: "Employees",
      icon: <FaUsers size={16} className="text-emerald-500" />,
      bg: "bg-emerald-50",
      route: `/owner/business/${bid}/manage/employee`,
    },
    {
      name: "Inventory",
      icon: <FaBoxOpen size={16} className="text-purple-500" />,
      bg: "bg-purple-50",
      route: `/owner/business/${bid}/manage/inventory`,
    },

    {
      name: "Suppliers",
      icon: <FaTruck size={16} className="text-amber-500" />,
      bg: "bg-amber-50",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Invoices",
      icon: <FaFileInvoice size={16} className="text-green-500" />,
      bg: "bg-green-50",
      route: `/owner/business/${bid}/manage/invoice`,
    },
    {
      name: "Managers",
      icon: <FaUserTie size={16} className="text-blue-600" />,
      bg: "bg-blue-50",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Products",
      icon: <FaTag size={16} className="text-orange-500" />,
      bg: "bg-orange-50",
      route: `/owner/business/${bid}/manage/product`,
    },

    {
      name: "Subscriptions",
      icon: <FaCrown size={16} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      route: `/owner/business/${bid}/manage`,
    },
    {
      name: "Tasks",
      icon: <FaTasks size={16} className="text-pink-500" />,
      bg: "bg-pink-50",
      route: `/owner/business/${bid}/manage`,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 py-8 px-6 sm:px-12 font-sans text-slate-800">
        <OwnerHeader />

        <div className="max-w-7xl mx-auto mt-8">
          {/* Greeting Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              {getGreeting()}{" "}
              <span className="text-indigo-650 font-black">
                {ownerData.name || "Owner"}
              </span>
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
              <FaBriefcase className="text-slate-400" size={11} />
              {activeBusiness.name}
            </span>
          </div>

          {/* Global Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-12">
            <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400">
              <FaSearch size={15} />
            </span>
            <input
              type="text"
              placeholder="Search apps, employees, analytics..."
              className="block w-full rounded-full border border-slate-200/80 py-4.5 pl-12 pr-6 text-slate-900 shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900 text-sm bg-white"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Left Area (Management & Modules - Spans 2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* AI Agent Promo Card */}
              <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <FaRobot size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      AI Agent
                    </h3>
                    <p className="text-xs text-slate-450 mt-0.5 leading-relaxed">
                      Ask for business summaries, monitor modules, and turn ERP
                      data into quick actions.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/owner/business/${bid}/analyse`)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl text-xs shrink-0 transition-all duration-300 shadow-md shadow-slate-900/10"
                >
                  Open Workspace
                </button>
              </div>

              {/* Management Modules Block */}
              <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm">
                {/* Modules Title */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
                  <div className="grid grid-cols-2 gap-0.5 w-4.5 h-4.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      Management Modules
                    </h3>
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6 text-center">
                  {modules.map((m, index) => (
                    <Link
                      key={index}
                      to={m.route}
                      className="group flex flex-col items-center gap-3 focus:outline-none"
                    >
                      <div
                        className={`w-12 h-12 ${m.bg} flex items-center justify-center rounded-2xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
                      >
                        {m.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-650 group-hover:text-slate-900 transition-colors">
                        {m.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Add Business Call to Action */}
                {businessData.length === 0 && (
                  <div className="mt-10 p-6 bg-indigo-50/40 rounded-2xl border border-indigo-100/50 text-center">
                    <p className="text-slate-600 text-xs font-bold mb-4">
                      You haven't setup any business operations yet.
                    </p>
                    <Link
                      to="/owner/business/new"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-650 text-white text-xs font-bold rounded-xl shadow hover:bg-indigo-750 transition"
                    >
                      <FaPlusCircle /> Add Business Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar Area (Shortcuts & Tasks - Spans 1 col) */}
            <div className="space-y-8">
              {/* Shortcuts Card */}
              <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-slate-900 text-sm">
                    Shortcuts
                  </h3>
                  <button className="text-[10px] font-black text-emerald-500 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 hover:bg-emerald-100/50 transition">
                    Configure
                  </button>
                </div>

                <div className="border border-dashed border-slate-200 rounded-2xl py-8 px-4 text-center">
                  <p className="text-slate-400 text-xs font-bold mb-1">
                    No actions pinned
                  </p>
                  <button className="text-xs text-emerald-600 font-bold hover:underline">
                    Add Shortcuts
                  </button>
                </div>
              </div>

              {/* Recent Tasks Card */}
              <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      Recent Tasks
                    </h3>
                    <p className="text-[9px] text-slate-450 font-bold">
                      5 items
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black text-slate-450 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition">
                    View All <FaChevronRight size={7} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Task 1 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-black text-slate-800">
                          Task2
                        </h4>
                        <p className="text-[10px] text-slate-450 mt-0.5">
                          review code
                        </p>
                      </div>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        Completed
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-slate-450 font-bold border-t border-slate-200/50 pt-2 font-mono">
                      <span>Feb 17, 4:33 PM</span>
                      <span className="flex items-center gap-1">
                        To:{" "}
                        <span className="text-slate-700 font-bold uppercase">
                          pratham
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Task 2 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-black text-slate-800">
                        feb 2026 month.
                      </h4>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-slate-450 font-bold border-t border-slate-200/50 pt-2 font-mono">
                      <span>Feb 3, 12:42 PM</span>
                      <span className="flex items-center gap-1">
                        To:{" "}
                        <span className="text-slate-700 font-bold uppercase">
                          smit
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Task 3 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 font-mono">
                          Review New Sa...
                        </h4>
                        <p className="text-[10px] text-slate-450 mt-0.5">
                          New Product's ne...
                        </p>
                      </div>
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        Completed
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-slate-450 font-bold border-t border-slate-200/50 pt-2 font-mono">
                      <span>Feb 3, 12:40 PM</span>
                      <span className="flex items-center gap-1">
                        To:{" "}
                        <span className="text-slate-700 font-bold uppercase">
                          smit
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Task 4 */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-black text-slate-800">
                        review new...
                      </h4>
                      <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        In Progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Custom Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Subscription */}
            <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                    <FaCrown size={15} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      Subscription
                    </h3>
                    <p className="text-[10px] text-slate-450">
                      Business plan status
                    </p>
                  </div>
                </div>
                <button className="text-[10px] font-black text-slate-450 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl transition">
                  View Details
                </button>
              </div>

              <div className="flex items-center justify-between bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 mb-6">
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    Enterprise
                  </h4>
                  <p className="text-[10px] text-slate-450 font-bold mt-0.5">
                    ₹1499.00 / 30 days
                  </p>
                </div>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                  active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-xs font-bold text-slate-500">
                <div className="bg-white border border-slate-200/70 rounded-2xl p-3.5">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">
                    Start
                  </span>
                  <span className="text-slate-800 text-xs">25/03/2026</span>
                </div>
                <div className="bg-white border border-slate-200/70 rounded-2xl p-3.5">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 font-sans">
                    End
                  </span>
                  <span className="text-slate-800 text-xs">24/04/2026</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-500 font-mono">
                <div>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 font-sans">
                    Remaining Days
                  </span>
                  <span className="text-slate-800 text-sm font-black">8</span>
                </div>
                <span className="bg-white border border-slate-200 text-slate-800 px-3 py-1 rounded-md text-[10px] font-black font-sans uppercase">
                  Paid
                </span>
              </div>
            </div>

            {/* Card 2: Owner Guide */}
            <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                    <FaInfoCircle size={15} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      Owner Guide
                    </h3>
                    <p className="text-[10px] text-slate-450">
                      Learn features, permissions, and best workflows.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6.5">
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Role
                  </span>
                  <span className="text-slate-900 text-lg font-black block">
                    Business Owner
                  </span>
                </div>
              </div>

              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold w-full py-3.5 rounded-2xl text-xs mt-8 transition-all duration-300 shadow-md shadow-slate-900/10">
                Open Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwnerHome;
