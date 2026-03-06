import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return {
        title: t('login.title'),
        description: t('login.subtitle'),
    };
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
