import type { Metadata } from "next";
import { DonorHomeDashboard } from "./components/DonorHomeDashboard";

export const metadata: Metadata = {
    title: "Dashboard | SehatID",
    description: "Your SehatID donor dashboard — manage donations and blood requests.",
};

export default function DashboardPage() {
    return (
        <>
            <main>
                <DonorHomeDashboard />
            </main>
        </>
    );
}
