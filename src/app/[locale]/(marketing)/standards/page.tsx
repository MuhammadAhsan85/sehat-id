import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const p = await params;
    const t = await getTranslations({ locale: p.locale, namespace: "marketing" });
    return { title: t("standardsTitle", { fallback: "Healthcare Standards" }) };
}

export default function StandardsPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
                        Healthcare Standards
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-slate-600">
                        This is a placeholder page for Healthcare Standards compliance.
                    </p>
                </div>
            </div>
        </div>
    );
}
