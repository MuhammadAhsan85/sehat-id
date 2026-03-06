import type { Metadata } from "next";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { DonorSearch } from "./components/DonorSearch";

export const metadata: Metadata = {
    title: "Find Blood Donors | SehatID",
    description: "Search for available blood donors near you across Pakistan.",
};

export default function FindDonorsPage() {
    return (
        <>
            <Navbar />
            <DonorSearch />
            <Footer />
        </>
    );
}
