import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaEnvelope, 
  FaPhone, 
  FaInfoCircle, 
  FaBriefcase, 
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [business, setBusiness] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`http://localhost:3000/employee/${id}`, {
          withCredentials: true,
        });
        if (res.data?.success && res.data.employee) {
          const emp = res.data.employee;
          setUser(emp);
          setType("employee");

          // Dynamically fetch business info for this employee
          if (emp.businessId) {
            try {
              const bizRes = await axios.get(
                `http://localhost:3000/owner/business/${emp.businessId}/view`,
                {
                  withCredentials: true,
                }
              );
              if (bizRes.data?.business) {
                setBusiness(bizRes.data.business);
              }
            } catch (err) {
              console.error(err);
            }
          }
          return;
        }
      } catch (e) {
        console.error(e);
      }

      setUser(null);
      setType("unknown");
    }

    if (id) getUser();
  }, [id]);

  if (type === null) return null;

  if (type === "unknown") {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center items-center font-sans">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-sm text-center">
          <h2 className="text-xl font-black text-slate-900 mb-2">Profile Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">No user account was found matching the specified ID identifier.</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs hover:bg-slate-800 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get Initials for Fallback Avatar
  const getInitials = (name) => {
    if (!name) return "EE";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Format Dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "10 Mar 2026";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "10:01";
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 py-10 px-6 sm:px-12 font-sans text-slate-800">
        
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all duration-300"
          >
            <FaArrowLeft className="text-slate-500" /> Back
          </button>
        </div>

        {/* Profile Card Header Container */}
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* Avatar and Primary Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full lg:w-auto">
            {user?.img?.secure_url ? (
              <img
                src={user.img.secure_url}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-100/80 shadow-md shadow-slate-900/5 shrink-0"
              />
            ) : (
              <div className="w-24 h-24 bg-slate-900 text-white font-black flex items-center justify-center rounded-3xl text-2xl shrink-0 shadow-md shadow-slate-900/20">
                {getInitials(user?.name)}
              </div>
            )}

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {user?.name}
                </h1>
                <FaCheckCircle className="text-emerald-500 text-lg sm:text-xl shrink-0" />
              </div>

              {/* Badges */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-2.5">
                <span className="bg-slate-100 text-slate-650 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md border border-slate-200/50">
                  {user?.workpage || "Employee"}
                </span>
                <span className="bg-slate-50 border border-slate-100 text-slate-450 px-2.5 py-0.5 text-[9px] font-bold rounded-md">
                  @{user?.name?.replace(/\s+/g, "").toLowerCase()}
                </span>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 hover:text-slate-800 cursor-pointer transition-colors">
                  <FaEnvelope className="text-slate-400" /> {user?.email}
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center gap-1.5 hover:text-slate-800 cursor-pointer transition-colors">
                  <FaPhone className="text-slate-400" /> {user?.mobileNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Right Status Cards */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0 border-t sm:border-t-0 lg:border-t-0 sm:pt-4 lg:pt-0 border-slate-100">
            {/* Status */}
            <div className="flex justify-between items-center sm:justify-start lg:justify-between gap-6 bg-emerald-50/50 border border-emerald-100/60 rounded-2xl px-4 py-2 text-xs w-full sm:w-[180px] lg:w-[220px]">
              <span className="uppercase tracking-wider text-[9px] font-black text-emerald-700/80">Status</span>
              <span className="font-bold text-emerald-600 bg-white border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]">Active</span>
            </div>

            {/* Joined */}
            <div className="flex justify-between items-center sm:justify-start lg:justify-between gap-6 bg-white border border-slate-200/70 rounded-2xl px-4 py-2 text-xs w-full sm:w-[180px] lg:w-[220px]">
              <span className="uppercase tracking-wider text-[9px] font-black text-slate-400">Joined</span>
              <span className="font-bold text-slate-700">{formatDate(user?.createdAt)}</span>
            </div>

            {/* Updated */}
            <div className="flex justify-between items-center sm:justify-start lg:justify-between gap-6 bg-white border border-slate-200/70 rounded-2xl px-4 py-2 text-xs w-full sm:w-[200px] lg:w-[220px]">
              <span className="uppercase tracking-wider text-[9px] font-black text-slate-400">Updated</span>
              <span className="font-bold text-slate-700">{formatDate(user?.updatedAt)}, {formatTime(user?.updatedAt)}</span>
            </div>
          </div>

        </div>

        {/* Lower Main Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Personal Info (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <FaInfoCircle size={15} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Personal Information</h3>
                <p className="text-[10px] text-slate-450 mt-0.5">Primary contact and account identity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Address */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Address</span>
                <span className="text-slate-800 text-sm font-bold block truncate">{user?.email}</span>
              </div>

              {/* Phone Number */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</span>
                <span className="text-slate-800 text-sm font-bold block">{user?.mobileNumber}</span>
              </div>

              {/* Member Since */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Member Since</span>
                <span className="text-slate-800 text-sm font-bold block">{formatDate(user?.createdAt)}</span>
              </div>

              {/* User ID */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">User ID</span>
                <span className="text-slate-800 text-sm font-black font-mono block">#{user?._id?.substring(0, 8) || "undefined"}</span>
              </div>

              {/* Salary */}
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 sm:col-span-2">
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Salary</span>
                <span className="text-emerald-600 text-base font-black font-mono block">₹{user?.salary?.toLocaleString("en-IN") || "0"}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Business Info (Spans 1 column) */}
          <div className="bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <FaBriefcase size={14} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Business Information</h3>
                <p className="text-[10px] text-slate-450 mt-0.5">Compliance and registration data</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Company Name</span>
                <span className="text-slate-900 text-base font-black block">{business?.name || "N/A"}</span>
              </div>

              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Business ID</span>
                <span className="text-slate-700 text-xs font-mono font-bold block">#{user?.businessId?.substring(user.businessId.length - 8) || "N/A"}</span>
              </div>

              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Description</span>
                <span className="text-slate-500 text-xs font-semibold block leading-relaxed bg-slate-50/50 border border-slate-100 rounded-xl p-3 mt-1">
                  {business?.description || "No description provided."}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Address (Spans Full Width) */}
          <div className="lg:col-span-3 bg-white rounded-[2rem] border border-slate-200/70 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <FaMapMarkerAlt size={14} />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-sm">Address Details</h3>
                <p className="text-[10px] text-slate-450 mt-0.5">Residential and contact location</p>
              </div>
            </div>

            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt size={13} />
              </div>
              <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Address</span>
                <span className="text-slate-800 text-sm font-bold block">{user?.address || "N/A"}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
