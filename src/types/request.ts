export type RequestStatus = "pending" | "accepted" | "rejected";

export interface BloodRequest {
    id: string;
    donorId?: string;
    recipientId: string;
    status: RequestStatus;
    bloodGroup: string;
    hospitalName: string;
    locationDistance?: string;
    patientDetails: string;
    unitsRequired: number;
    urgency: "urgent" | "normal";
    createdAt: string;
    updatedAt: string;
}
