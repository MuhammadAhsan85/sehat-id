"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

interface LogoProps {
    className?: string;
    iconWidth?: number;
    iconHeight?: number;
    fontSize?: string;
}

export default function Logo({
    className = "",
    fontSize = "text-xl md:text-2xl",
    iconWidth,
    iconHeight,
}: LogoProps) {
    const t = useTranslations("navbar");

    return (
        <Link
            href={ROUTES.HOME}
            className={`flex items-center gap-2.5 group ${className}`}
            aria-label={t("links.home") || "SehatID Home"}
        >
            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ width: iconWidth || 32, height: iconHeight || 32 }}>
                <Image
                    src="/logo.svg"
                    alt=""
                    width={iconWidth || 32}
                    height={iconHeight || 32}
                    className="object-contain"
                    priority
                />
            </div>
            <span className={`${fontSize} font-bold tracking-tight flex items-center`}>
                <span className="text-slate-900">Sehat</span>
                <span className="text-[#C41C1C]">ID</span>
            </span>
        </Link>
    );
}
