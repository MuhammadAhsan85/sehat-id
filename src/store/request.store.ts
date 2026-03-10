"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BloodRequest, RequestStatus } from "@/types/request";

interface RequestState {
    requests: BloodRequest[];

    // Actions
    addRequest: (donorId: string, recipientId: string) => void;
    updateRequestStatus: (requestId: string, status: RequestStatus) => void;
    getRequestById: (id: string) => BloodRequest | undefined;
    getRequestByDonorId: (donorId: string) => BloodRequest | undefined;
    simulateApproval: (donorId: string) => void;
}

const MOCK_REQUESTS: BloodRequest[] = [
    {
        id: "REQ-101",
        recipientId: "user-123",
        status: "pending",
        bloodGroup: "B-",
        hospitalName: "Aga Khan University Hospital",
        locationDistance: "3.2 km away",
        patientDetails: "Male, 45y - Surgical Emergency",
        unitsRequired: 2,
        urgency: "urgent",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const useRequestStore = create<RequestState>()(
    persist(
        (set, get) => ({
            requests: MOCK_REQUESTS,

            addRequest: (donorId, recipientId) => {
                // ... (keeping existing logic for now but focusing on the notification flow)
            },

            updateRequestStatus: (requestId, status) => {
                set((state) => ({
                    requests: state.requests.map((r) =>
                        r.id === requestId
                            ? { ...r, status, updatedAt: new Date().toISOString() }
                            : r
                    ),
                }));
            },

            getRequestById: (id: string) => {
                return get().requests.find(r => r.id === id);
            },

            getRequestByDonorId: (donorId) => {
                return get().requests.find(r => r.donorId === donorId);
            },

            simulateApproval: (donorId: string) => {
                set((state) => ({
                    requests: state.requests.map((r) =>
                        r.donorId === donorId ? { ...r, status: "accepted", updatedAt: new Date().toISOString() } : r
                    ),
                }));
            },
        }),
        {
            name: "sehatid_requests",
        }
    )
);
