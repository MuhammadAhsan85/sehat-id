import type { Metadata } from "next";
import Navbar from "@/shared/components/Navbar";
import HeroSection from "./home/components/HeroSection";
import TrustBannerSection from "./home/components/TrustBannerSection";
import ProcessSnippetSection from "./home/components/ProcessSnippetSection";
import FeaturesSection from "./home/components/FeaturesSection";
import EmergencyBannerSection from "./home/components/EmergencyBannerSection";
import FinalCTASection from "./home/components/FinalCTASection";
import ImpactStorySection from "./home/components/ImpactStorySection";
import Footer from "@/shared/components/Footer";

export const metadata: Metadata = {
    title: "SehatID | Pakistan's Most Trusted Emergency Blood Network",
    description: "Connect instantly with verified blood donors across Pakistan. Our secure, real-time platform ensures that life-saving help is always just a click away.",
    keywords: ["blood donation Pakistan", "emergency blood matching", "verified donors", "SehatID", "life-saving network"],
    openGraph: {
        title: "SehatID | Save Lives in Pakistan",
        description: "Join Pakistan's safest digital blood network. Connect with verified donors instantly.",
        type: "website",
        locale: "en_PK",
    }
};

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Top navigation bar */}
            <Navbar />

            {/* Main content area */}
            <main className="flex-grow pt-20 md:pt-24">
                {/* Hero banner with SEO optimized copy and Search Widget */}
                <HeroSection />

                {/* Clean banner showing dynamic numbers/stats */}
                <TrustBannerSection />

                {/* Real success story section */}
                <ImpactStorySection />

                {/* 3-step process snippet from 'How it Works' */}
                <ProcessSnippetSection />

                {/* Security, Privacy, and features section */}
                <FeaturesSection />

                {/* Urgent blood requests activity/banner */}
                <EmergencyBannerSection />

                {/* Final strong closing banner */}
                <FinalCTASection />
            </main>

            {/* Footer with links and contact info */}
            <Footer />
        </div>
    );
}
