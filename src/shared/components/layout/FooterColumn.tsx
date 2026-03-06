// FooterColumn — reusable column for footer nav sections

interface FooterLink {
    label: string;
    href?: string;
}

interface FooterColumnProps {
    heading: string;
    links: FooterLink[];
}

export default function FooterColumn({ heading, links }: FooterColumnProps) {
    return (
        <nav aria-label={heading}>
            <h2 className="mb-6 text-base font-bold text-slate-900">{heading}</h2>
            <ul className="flex flex-col gap-3">
                {links.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href ?? "#"}
                            className="text-sm text-slate-600 transition-colors hover:text-[#d61f1f] focus-visible:outline-2 focus-visible:outline-[#d61f1f] focus-visible:outline-offset-2 rounded"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
