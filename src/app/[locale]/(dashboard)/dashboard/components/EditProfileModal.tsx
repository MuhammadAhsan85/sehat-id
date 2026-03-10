"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Weight, Droplet, Save, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^\+92\s\d{3}\s\d{7}$/, 'Phone must be in format +92 300 1234567'),
    bloodGroup: z.string().min(1, 'Blood group is required'),
    city: z.string().min(2, 'City is required'),
    area: z.string().min(2, 'Area is required'),
    weight: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { user, updateProfile } = useAuthStore();
    const [isSaving, setIsSaving] = React.useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
            bloodGroup: user?.bloodGroup || '',
            city: user?.city || '',
            area: user?.area || '',
            weight: user?.weight || '',
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                phone: user.phone || '',
                bloodGroup: user.bloodGroup || '',
                city: user.city || '',
                area: user.area || '',
                weight: user.weight || '',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormValues) => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        updateProfile(data);
        setIsSaving(false);
        toast.success("Profile updated successfully!");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Edit Profile</h3>
                                <p className="text-sm text-slate-500">Update your account information</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <User size={14} className="text-slate-400" />
                                        Full Name
                                    </label>
                                    <input
                                        {...register('name')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all`}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400" />
                                        Phone Number
                                    </label>
                                    <input
                                        {...register('phone')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all`}
                                        placeholder="+92 300 1234567"
                                    />
                                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                                </div>

                                {/* Blood Group */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Droplet size={14} className="text-slate-400" />
                                        Blood Group
                                    </label>
                                    <select
                                        {...register('bloodGroup')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.bloodGroup ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all appearance-none bg-white`}
                                    >
                                        <option value="">Select Blood Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                    {errors.bloodGroup && <p className="text-xs text-red-500 font-medium">{errors.bloodGroup.message}</p>}
                                </div>

                                {/* Weight */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Weight size={14} className="text-slate-400" />
                                        Weight (kg)
                                    </label>
                                    <input
                                        {...register('weight')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.weight ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all`}
                                        placeholder="e.g. 70"
                                    />
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-400" />
                                        City
                                    </label>
                                    <input
                                        {...register('city')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all`}
                                        placeholder="City"
                                    />
                                    {errors.city && <p className="text-xs text-red-500 font-medium">{errors.city.message}</p>}
                                </div>

                                {/* Area */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin size={14} className="text-slate-400" />
                                        Area
                                    </label>
                                    <input
                                        {...register('area')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.area ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-[#C41C1C]'} outline-none transition-all`}
                                        placeholder="Area"
                                    />
                                    {errors.area && <p className="text-xs text-red-500 font-medium">{errors.area.message}</p>}
                                </div>
                            </div>

                            {/* Footer / Action */}
                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-[2] px-6 py-4 rounded-full bg-[#C41C1C] text-white font-bold shadow-lg shadow-red-900/20 hover:bg-[#A01717] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:translate-y-0"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
