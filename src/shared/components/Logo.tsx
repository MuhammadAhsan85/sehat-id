"use client";

import Image from "next/image";
import Link from "next/link";
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
}: LogoProps) {
    const t = useTranslations("navbar");

    return (
        <Link
            href={ROUTES.HOME}
            className={`flex items-center gap-2.5 group ${className}`}
            aria-label={t("links.home") || "SehatID Home"}
        >
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                    src="/logo.svg"
                    alt=""
                    fill
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
