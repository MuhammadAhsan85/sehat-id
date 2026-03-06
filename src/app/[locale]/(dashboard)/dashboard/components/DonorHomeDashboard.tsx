import { UserDashboardSection } from "./UserDashboardSection";
import Footer from "@/shared/components/Footer";

export function DonorHomeDashboard() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f8f6f6]">
            <div className="flex-1">
                <UserDashboardSection />
            </div>
            <Footer />
        </div>
    );
}
