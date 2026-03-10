import type { Metadata } from "next";
import { DonorSearch } from "./components/DonorSearch";

export const metadata: Metadata = {
    title: "Find Blood Donors | SehatID",
    description: "Search for available blood donors near you across Pakistan.",
};

export default function FindDonorsPage() {
    return (
        <>
            <DonorSearch />
        </>
    );
}
