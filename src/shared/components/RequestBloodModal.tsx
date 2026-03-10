'use client';

import React, { useState } from 'react';
import {
    X, MapPin, ChevronDown, Zap, Asterisk, Plus, Minus, Calendar, CheckCircle2, ArrowLeft
} from 'lucide-react';

interface RequestBloodModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RequestBloodModal({ isOpen, onClose }: RequestBloodModalProps) {
    // Navigation State
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1 State
    const [patientName, setPatientName] = useState('');
    const [hospital, setHospital] = useState('');
    const [units, setUnits] = useState(1);
    const [bloodGroup, setBloodGroup] = useState('');
    const [urgency, setUrgency] = useState('Normal');

    // Step 2 State
    const [city, setCity] = useState('');
    const [hospitalArea, setHospitalArea] = useState('');
    const [requirementType, setRequirementType] = useState('Urgent'); // 'Urgent' or 'Scheduled'
    const [deadline, setDeadline] = useState('');

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const handleUnitChange = (action: 'increase' | 'decrease') => {
        if (action === 'increase' && units < 10) setUnits(units + 1);
        if (action === 'decrease' && units > 1) setUnits(units - 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 min-h-screen bg-slate-900/60 font-sans flex items-center justify-center p-4 selection:bg-red-100 selection:text-red-900 backdrop-blur-sm z-[100]">

            {/* Modal Container */}
            <div className="bg-white w-full max-w-5xl rounded-[2rem] flex flex-col md:flex-row shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh]">

                {/* LEFT SIDEBAR (Steps & Info) */}
                <div className="w-full md:w-[35%] bg-[#FAFAFA] border-r border-slate-100 p-8 flex flex-col justify-between overflow-y-auto hidden md:flex">

                    <div className="space-y-8 mt-2">
                        {/* Step 0: Initial Info */}
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Asterisk size={16} className="text-[#C41C1C]" />
                            </div>
                            <div>
                                <h4 className="text-sm font-extrabold text-slate-900">Request Blood</h4>
                                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Urgent Assistance</p>
                            </div>
                        </div>

                        {/* Step 1 */}
                        <div className={`flex items-start gap-4 transition-opacity ${currentStep === 1 ? 'opacity-100' : currentStep > 1 ? 'opacity-70' : 'opacity-50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${currentStep === 1 ? 'bg-[#C41C1C] shadow-red-200 text-white' : currentStep > 1 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                {currentStep > 1 ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">1</span>}
                            </div>
                            <div>
                                <h4 className={`text-sm font-extrabold ${currentStep === 1 ? 'text-slate-900' : 'text-slate-700'}`}>Request Info</h4>
                                <p className={`text-[10px] font-bold mt-0.5 ${currentStep === 1 ? 'text-[#C41C1C]' : currentStep > 1 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {currentStep === 1 ? 'In Progress' : 'Completed'}
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className={`flex items-start gap-4 transition-opacity ${currentStep === 2 ? 'opacity-100' : currentStep > 2 ? 'opacity-70' : 'opacity-50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${currentStep === 2 ? 'bg-[#C41C1C] shadow-red-200 text-white' : currentStep > 2 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                                {currentStep > 2 ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">2</span>}
                            </div>
                            <div>
                                <h4 className={`text-sm font-extrabold ${currentStep === 2 ? 'text-slate-900' : 'text-slate-700'}`}>Location & Timing</h4>
                                <p className={`text-[10px] font-bold mt-0.5 ${currentStep === 2 ? 'text-[#C41C1C]' : currentStep > 2 ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {currentStep === 2 ? 'In Progress' : currentStep > 2 ? 'Completed' : 'Pending'}
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className={`flex items-start gap-4 transition-opacity ${currentStep === 3 ? 'opacity-100' : 'opacity-50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${currentStep === 3 ? 'bg-[#C41C1C] shadow-red-200 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                <span className="text-xs font-bold">3</span>
                            </div>
                            <div>
                                <h4 className={`text-sm font-extrabold ${currentStep === 3 ? 'text-slate-900' : 'text-slate-700'}`}>Confirm Request</h4>
                                <p className={`text-[10px] font-bold mt-0.5 ${currentStep === 3 ? 'text-[#C41C1C]' : 'text-slate-400'}`}>
                                    {currentStep === 3 ? 'In Progress' : 'Final Step'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info Note Box */}
                    <div className="mt-12 bg-red-50/50 border border-red-100 rounded-2xl p-5">
                        <h5 className="text-[10px] font-black text-[#C41C1C] uppercase tracking-widest mb-2">Note</h5>
                        <p className="text-xs font-medium text-slate-600 leading-relaxed">
                            Blood donation is a gift of life. Ensure all details are accurate to speed up the verification process.
                        </p>
                    </div>
                </div>

                {/* RIGHT CONTENT AREA (Form) */}
                <div className="w-full md:w-[65%] p-6 md:p-10 relative bg-white overflow-y-auto">

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full z-10"
                    >
                        <X size={20} />
                    </button>

                    {currentStep === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Header */}
                            <div className="mb-6 pr-12">
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Patient Details</h2>
                                <p className="text-sm font-medium text-slate-500">Step 1 of 3: Enter the medical requirements</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-slate-100 rounded-full mb-8">
                                <div className="w-1/3 h-full bg-[#C41C1C] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(196,28,28,0.3)]"></div>
                            </div>

                            {/* Form */}
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>

                                {/* Patient Name */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Patient Full Name</label>
                                    <input
                                        type="text"
                                        value={patientName}
                                        onChange={(e) => setPatientName(e.target.value)}
                                        placeholder="e.g. Ahmed Khan"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all font-medium placeholder:text-slate-400"
                                        required
                                    />
                                </div>

                                {/* Hospital / Medical Center */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Hospital / Medical Center</label>
                                    <div className="relative flex items-center">
                                        <MapPin size={18} className="absolute left-4 text-slate-400" />
                                        <input
                                            type="text"
                                            value={hospital}
                                            onChange={(e) => setHospital(e.target.value)}
                                            placeholder="Search hospital or city in Pakistan"
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all font-medium placeholder:text-slate-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Units Input */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Units (Bags) Needed</label>
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2 md:w-1/2">
                                        <button type="button" onClick={() => handleUnitChange('decrease')} className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 hover:text-slate-900 hover:border-slate-300 transition-colors"><Minus size={18} /></button>
                                        <span className="font-extrabold text-slate-900 text-xl w-16 text-center">{units}</span>
                                        <button type="button" onClick={() => handleUnitChange('increase')} className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 hover:text-[#C41C1C] hover:border-red-200 transition-colors"><Plus size={18} /></button>
                                    </div>
                                </div>

                                {/* Blood Group Selection */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Required Blood Group</label>
                                    <div className="grid grid-cols-4 gap-2.5">
                                        {bloodGroups.map((bg) => (
                                            <button
                                                key={bg}
                                                type="button"
                                                onClick={() => setBloodGroup(bg)}
                                                className={`py-3.5 rounded-xl font-black text-sm transition-all ${bloodGroup === bg
                                                    ? 'bg-[#C41C1C] text-white shadow-xl shadow-red-200 scale-105'
                                                    : 'bg-slate-50 border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                                                    }`}
                                            >
                                                {bg}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Request Urgency Toggle */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Request Urgency</label>
                                    <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1.5 gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setUrgency('Normal')}
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${urgency === 'Normal'
                                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                                }`}
                                        >
                                            Normal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUrgency('Emergency')}
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${urgency === 'Emergency'
                                                ? 'bg-red-50 text-[#C41C1C] shadow-sm border border-red-100'
                                                : 'text-slate-500 hover:text-[#C41C1C] hover:bg-slate-100'
                                                }`}
                                        >
                                            <Zap size={14} className={urgency === 'Emergency' ? 'fill-current' : ''} />
                                            Emergency
                                        </button>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2"
                                    >
                                        Cancel
                                    </button>

                                    {/* Primary Button */}
                                    <button
                                        type="submit"
                                        disabled={!bloodGroup}
                                        className="rounded-full bg-[#C41C1C] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                                    >
                                        Next: Location & Timing
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Header */}
                            <div className="mb-6 pr-12">
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Location & Timing</h2>
                                <p className="text-sm font-medium text-slate-500">Step 2 of 3: Where and when is the blood needed?</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-slate-100 rounded-full mb-8">
                                <div className="w-2/3 h-full bg-[#C41C1C] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(196,28,28,0.3)]"></div>
                            </div>

                            {/* Form */}
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }}>

                                {/* City Dropdown */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">City</label>
                                    <div className="relative flex items-center">
                                        <select
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all font-bold text-sm appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select City</option>
                                            <option value="Karachi">Karachi</option>
                                            <option value="Lahore">Lahore</option>
                                            <option value="Islamabad">Islamabad</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Hospital Area Input */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Hospital Area</label>
                                    <input
                                        type="text"
                                        value={hospitalArea}
                                        onChange={(e) => setHospitalArea(e.target.value)}
                                        placeholder="e.g., Gulshan, DHA"
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all font-bold text-sm placeholder:text-slate-400"
                                        required
                                    />
                                </div>

                                {/* Requirement Type Toggle */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Requirement Type</label>
                                    <div className="flex bg-slate-50 border border-slate-100 rounded-xl p-1.5 gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setRequirementType('Urgent')}
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${requirementType === 'Urgent'
                                                ? 'bg-[#C41C1C] text-white shadow-md'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                                }`}
                                        >
                                            Urgent
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRequirementType('Scheduled')}
                                            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${requirementType === 'Scheduled'
                                                ? 'bg-slate-800 text-white shadow-md'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                                }`}
                                        >
                                            Scheduled
                                        </button>
                                    </div>
                                </div>

                                {/* Deadline */}
                                <div className={`transition-all duration-300 ${requirementType === 'Urgent' ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2 flex items-center">
                                        <Calendar size={14} className="mr-1.5" /> Deadline (For Scheduled)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                        disabled={requirementType === 'Urgent'}
                                        required={requirementType === 'Scheduled'}
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all font-bold text-sm text-slate-500"
                                    />
                                </div>

                                {/* Hospital Location Map Placeholder */}
                                <div>
                                    <label className="block text-xs font-extrabold text-slate-800 mb-2">Hospital Location</label>
                                    <div className="w-full h-32 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group cursor-pointer shadow-inner">
                                        <div className="absolute inset-0 bg-[#E5E7EB] opacity-60" style={{
                                            backgroundImage: `radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px), radial-gradient(circle at center, transparent 0, transparent 2px, #fff 3px, #fff 4px)`,
                                            backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'
                                        }}></div>
                                        <div className="absolute inset-0 bg-blue-400/10 mix-blend-multiply"></div>

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C41C1C] flex flex-col items-center group-hover:scale-110 transition-transform">
                                            <MapPin size={28} fill="currentColor" className="drop-shadow-md z-10" />
                                            <div className="w-4 h-4 bg-red-500/40 rounded-full animate-ping absolute -bottom-1"></div>
                                        </div>

                                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 uppercase tracking-tighter">
                                            Adjust Location
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(1)}
                                        className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 flex items-center gap-2"
                                    >
                                        <ArrowLeft size={16} />
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-full bg-[#C41C1C] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-200 transition-all hover:bg-[#A01717] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        Next: Confirm Request
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Header */}
                            <div className="mb-6 pr-12">
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Confirm Request</h2>
                                <p className="text-sm font-medium text-slate-500">Step 3 of 3: Review and submit your request</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-slate-100 rounded-full mb-8">
                                <div className="w-full h-full bg-[#C41C1C] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(196,28,28,0.3)]"></div>
                            </div>

                            <div className="py-16 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-emerald-200/50">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Almost Done!</h3>
                                <p className="text-sm font-medium text-slate-500 max-w-sm leading-relaxed">
                                    Please verify the details below before submitting the emergency broadcast to local donors.
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(2)}
                                    className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-4 py-2 flex items-center gap-2"
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        // In a real app, this would submit the form data to an API
                                        onClose();
                                        setCurrentStep(1); // Reset step for next opening
                                    }}
                                    className="rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700 hover:-translate-y-0.5"
                                >
                                    Confirm & Send Request
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
