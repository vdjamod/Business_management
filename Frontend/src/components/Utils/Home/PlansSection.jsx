import React, { useMemo, useState } from "react";
import { FaCheck, FaCrown, FaUsers, FaBoxOpen, FaFileInvoice, FaCodeBranch, FaChevronRight, FaGem, FaRocket, FaShieldAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const fallbackPlans = [
    {
        id: "starter",
        name: "Starter",
        price: 0,
        duration_days: 30,
        max_branches: 1,
        max_products: 50,
        max_invoices: 100,
        max_staff: 3,
        has_advanced_analytics: false,
        has_chat: true,
        has_ai_agent: false,
        has_api_access: false
    },
    {
        id: "pro",
        name: "Professional",
        price: 499,
        duration_days: 30,
        max_branches: 5,
        max_products: 500,
        max_invoices: 2000,
        max_staff: 15,
        has_advanced_analytics: true,
        has_chat: true,
        has_ai_agent: true,
        has_api_access: false
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: 1999,
        duration_days: 30,
        max_branches: 20,
        max_products: 5000,
        max_invoices: 10000,
        max_staff: 50,
        has_advanced_analytics: true,
        has_chat: true,
        has_ai_agent: true,
        has_api_access: true
    }
];

export default function PlansSection({ compact = false, title = "Select Your Experience", subtitle = "Choose a plan that fits your business scale. From startups to enterprises, we have you covered." }) {
    const [purchasingId, setPurchasingId] = useState(null);

    const handleChoosePlan = (plan) => {
        setPurchasingId(plan.id);
        setTimeout(() => {
            setPurchasingId(null);
            Swal.fire({
                title: `${plan.name} Plan!`,
                text: plan.price === 0 ? "You have successfully started your free trial!" : "Ready to scale? Redirecting to setup portal...",
                icon: "success",
                confirmButtonColor: "#9333ea"
            });
        }, 1000);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

            <div className="section-shell">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-semibold text-slate-900 tracking-tight mb-4">
                        {title}
                    </h2>
                    <p className="text-slate-500 font-medium leading-relaxed text-base">
                        {subtitle}
                    </p>
                </div>

                <div className="overflow-x-auto pb-8 custom-scrollbar">
                    <div className="flex justify-center gap-8 p-4">
                        {fallbackPlans.map((plan, index) => {
                            const isRecommended = plan.name === "Professional";
                            const isFree = plan.price === 0;

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative flex flex-col group transition-all duration-500 hover:-translate-y-2 w-[280px] sm:w-[320px] rounded-3xl border ${
                                        isRecommended 
                                        ? "bg-white border-2 border-purple-500 shadow-2xl shadow-purple-500/20 z-10" 
                                        : "bg-white/70 backdrop-blur-xl border-slate-200/60 shadow-xl shadow-slate-200/50"
                                    }`}
                                >
                                    {isRecommended && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-650 to-purple-500 text-white text-[9px] font-black uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="p-6 pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm ${
                                                isRecommended ? "bg-purple-50 text-purple-600" : "bg-slate-50 text-slate-400"
                                            }`}>
                                                {isFree ? <FaRocket /> : isRecommended ? <FaGem /> : <FaCrown />}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-black text-slate-900 mb-1">{plan.name}</h3>
                                        
                                        <div className="flex items-baseline gap-1 mt-3">
                                            <span className="text-3xl font-black text-slate-900 tracking-tight">
                                                {isFree ? "Free" : `₹${plan.price}`}
                                            </span>
                                            {!isFree && (
                                                <span className="text-slate-450 text-[10px] font-bold uppercase tracking-widest">/{plan.duration_days}d</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="px-6 py-4 flex-1 space-y-6">
                                        <div className="space-y-3">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Quotas</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <QuotaCard icon={<FaCodeBranch />} label="Branches" value={plan.max_branches} />
                                                <QuotaCard icon={<FaBoxOpen />} label="Products" value={plan.max_products} />
                                                <QuotaCard icon={<FaFileInvoice />} label="Invoices" value={plan.max_invoices} />
                                                <QuotaCard icon={<FaUsers />} label="Staff" value={plan.max_staff} />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[9px] font-black text-slate-450 uppercase tracking-[0.2em]">Features</p>
                                            <div className="space-y-2">
                                                <FeatureItem label="Advanced Analytics" enabled={plan.has_advanced_analytics} />
                                                <FeatureItem label="Team Chat" enabled={plan.has_chat} />
                                                <FeatureItem label="AI Operations Agent" enabled={plan.has_ai_agent} />
                                                <FeatureItem label="API Access" enabled={plan.has_api_access} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-2">
                                        <button
                                            onClick={() => handleChoosePlan(plan)}
                                            disabled={purchasingId === plan.id}
                                            className={`w-full group/btn relative flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all duration-300 ${
                                                isRecommended
                                                    ? "bg-purple-600 text-white hover:bg-purple-700 shadow-xl shadow-purple-500/20"
                                                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                                            }`}
                                        >
                                            {purchasingId === plan.id ? (
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span>{isFree ? "Start Now" : "Get Started"}</span>
                                                    <FaChevronRight size={10} className="transition-transform group-hover/btn:translate-x-1" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function QuotaCard({ icon, label, value }) {
    return (
        <div className="bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <span className="text-[9px]">{icon}</span>
                <span className="text-[8px] font-black uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-xs font-black text-slate-900">{value || "∞"}</div>
        </div>
    );
}

function FeatureItem({ label, enabled }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className={`h-4 w-4 rounded-md flex items-center justify-center ${
                enabled ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/10" : "bg-slate-50 text-slate-350"
            }`}>
                <FaCheck size={7} strokeWidth={3} />
            </div>
            <span className={`text-[12px] font-bold ${enabled ? "text-slate-700" : "text-slate-400 line-through decoration-slate-200"}`}>
                {label}
            </span>
        </div>
    );
}
