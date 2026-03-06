// TrustSection — "Built on Privacy. Built on Trust." 4-card feature section
// Matches the Figma design with icon placeholders replaced by inline SVGs

// ── Privacy feature cards data ────────────────────────────────────────────────
const TRUST_FEATURES = [
    {
        title: "CNIC Hashing",
        description:
            "Your national ID is salted and hashed using SHA-256. We never store or see your raw identity numbers.",
        icon: (
            <svg width="20" height="28" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="15" y2="11" />
                <line x1="9" y1="15" x2="13" y2="15" />
            </svg>
        ),
    },
    {
        title: "Phone Privacy",
        description:
            "Contact details are only visible to verified matches once both parties confirm interest in the donation.",
        icon: (
            <svg width="20" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
        ),
    },
    {
        title: "Action Logging",
        description:
            "Every interaction is audited to prevent misuse. Our moderation team reviews suspicious platform behavior 24/7.",
        icon: (
            <svg width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
    },
    {
        title: "Privacy by Design",
        description:
            "Data protection is at our core. We only collect the bare minimum required to connect donors safely.",
        icon: (
            <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            </svg>
        ),
    },
] as const;

export default function TrustSection() {
    return (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-10" aria-labelledby="trust-heading">
            <div className="mx-auto max-w-[1200px] space-y-16">

                {/* Section heading */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2
                        id="trust-heading"
                        className="text-4xl font-black text-slate-900 leading-tight"
                    >
                        Built on Privacy. Built on Trust.
                    </h2>
                    <p className="max-w-xl text-lg text-slate-500 leading-7">
                        We use industry-standard encryption and privacy-preserving technologies to ensure your data stays safe while you save lives.
                    </p>
                </div>

                {/* Feature cards — 4-column responsive grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {TRUST_FEATURES.map(({ title, description, icon }) => (
                        <div
                            key={title}
                            className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Icon badge */}
                            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-700/10 text-red-700">
                                {icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                                <p className="text-sm text-slate-500 leading-6">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
