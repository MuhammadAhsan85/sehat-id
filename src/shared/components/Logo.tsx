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
    iconWidth = 32,
    iconHeight = 32,
    fontSize = "text-xl",
}: LogoProps) {
    const t = useTranslations("navbar");

    return (
        <Link href={ROUTES.HOME} className={`flex items-center gap-2 ${className}`} aria-label={t("links.home") || "SehatID Home"}>
            <Image
                src="/logo.svg"
                alt=""
                width={iconWidth}
                height={iconHeight}
                className="w-auto h-auto"
                priority
            />
            <span className={`${fontSize} font-bold tracking-tight`}>
                <span className="text-slate-900">Sehat</span>
                <span className="text-[#C41C1C]">ID</span>
            </span>
        </Link>
    );
}
