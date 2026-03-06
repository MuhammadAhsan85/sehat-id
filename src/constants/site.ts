/**
 * Site-wide metadata and configuration constants.
 */
export const SITE = {
    NAME: "SehatID",
    TAGLINE: "Pakistan's Health Emergency Network",
    DESCRIPTION:
        "Trusted platform for verified blood donor matching in Pakistan. We bridge the gap between donors and patients in real-time, ensuring safety and privacy in every connection.",
    URL: process.env.NEXT_PUBLIC_APP_URL ?? "https://sehatid.pk",
    OG_IMAGE: "/og-image.png",
    TWITTER_HANDLE: "@sehatid_pk",
    CONTACT: {
        EMAIL: "support@sehatid.pk",
        PHONE: "+92 21 3456 7890",
        ADDRESS: "Karachi Innovation Center, Sindh, Pakistan",
    },
    COPYRIGHT_YEAR: 2024,
    ORG_NAME: "Sehat ID",
    ORG_LEGAL: "Registered Life-Saving Organization in Pakistan",
} as const;

/** Blood groups supported by the platform (display order). */
export const BLOOD_GROUPS = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
] as const;

/** Pakistan provinces supported by the platform. */
export const PROVINCES = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Gilgit-Baltistan",
    "Azad Jammu & Kashmir",
    "Islamabad Capital Territory",
] as const;
