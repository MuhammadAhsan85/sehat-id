import type { Metadata } from "next";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import LocationPickerDemo from "./LocationPickerDemo";

export const metadata: Metadata = {
    title: "Location Picker | SehatID",
    description: "Select your country, state, and city to find nearby donors.",
};

export default function LocationPickerPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f8f6f6]">
                <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <span className="inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold tracking-widest text-red-600 mb-4">
                            SMART LOCATION
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                            Find Donors Near You
                        </h1>
                        <p className="mt-3 text-lg text-gray-500">
                            Select your country, state, and city to filter donors in your area.
                        </p>
                    </div>
                    <LocationPickerDemo />
                </section>
            </main>
            <Footer />
        </>
    );
}
