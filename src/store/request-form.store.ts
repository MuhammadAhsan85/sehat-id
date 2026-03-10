"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BloodGroup } from "@/types/donor";

export interface RequestFormData {
    // Step 1: Request Info
    patientName: string;
    bloodGroup: BloodGroup | "";
    units: number;
    hospitalName: string;
    urgency: "urgent" | "standard" | "whenever";

    // Step 2: Location & Timing
    city: string;
    hospitalArea: string;
    requirementType: "Urgent" | "Scheduled";
    deadline?: string;

    // Step 3: Confirm Request
    contactName: string;
    contactNumber: string;
    additionalNotes?: string;

    currentStep: number;
}

interface RequestFormState {
    formData: RequestFormData;

    // Actions
    updateStep1: (data: Pick<RequestFormData, "patientName" | "bloodGroup" | "units" | "hospitalName" | "urgency">) => void;
    updateStep2: (data: Pick<RequestFormData, "city" | "hospitalArea" | "requirementType" | "deadline">) => void;
    updateStep3: (data: Pick<RequestFormData, "contactName" | "contactNumber" | "additionalNotes">) => void;
    setStep: (step: number) => void;
    resetForm: () => void;
}

const initialData: RequestFormData = {
    patientName: "",
    bloodGroup: "",
    units: 1,
    hospitalName: "",
    urgency: "standard",
    city: "",
    hospitalArea: "",
    requirementType: "Urgent",
    deadline: "",
    contactName: "",
    contactNumber: "",
    additionalNotes: "",
    currentStep: 1,
};

export const useRequestFormStore = create<RequestFormState>()(
    persist(
        (set) => ({
            formData: initialData,

            updateStep1: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data, currentStep: 2 }
                })),

            updateStep2: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data, currentStep: 3 }
                })),

            updateStep3: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data }
                })),

            setStep: (step) =>
                set((state) => ({
                    formData: { ...state.formData, currentStep: step }
                })),

            resetForm: () => set({ formData: initialData }),
        }),
        {
            name: "sehatid_create_request_flow",
        }
    )
);
