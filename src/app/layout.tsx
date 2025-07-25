import type {Metadata, Viewport} from "next";

import {auth} from "@/auth";

import "./globals.css";

import {Fredoka} from "next/font/google";
import {Toaster} from "react-hot-toast";

import {AppSessionProvider} from "@/app/AppSessionProvider.tsx";
import {ServiceWorkerRegister} from "@/app/components/pwa/ServiceWorkerRegister.tsx";
import {Footer} from "@/app/components/layout/Footer";
import {Sidebar} from "@/app/components/layout/Sidebar.tsx";

const fredoka = Fredoka({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-fredoka",
});

export const metadata: Metadata = {
    title: "Plants Documentation App",
    description: "A simple application created for plant growing enthusiasts",
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: [
        "nextjs",
        "next15",
        "pwa",
        "next-pwa",
        "plant-app",
        "plant-documentation",
        "plant-collection",
    ],
    category: "application",
    authors: [
        {
            name: "Monika Cilińska",
            url: "https://www.linkedin.com/in/monika-cilinska/",
        },
    ],
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#F5F8F2"},
        {media: "(prefers-color-scheme: dark)", color: "#0D1B13"},
    ],
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${fredoka.variable}`}
        >
        <body
            className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen overflow-x-hidden">
        <AppSessionProvider session={session}>
            <div className="flex min-h-screen w-full max-w-full overflow-hidden">
                <Sidebar/>
                <div className="flex flex-col flex-1">
                    <main className="flex-1 w-full overflow-y-auto">
                        {children}
                    </main>
                    <Footer className="flex-none"/>
                </div>
            </div>
        </AppSessionProvider>
        <Toaster toastOptions={{duration: 4000}}/>
        <ServiceWorkerRegister/>
        </body>
        </html>
    );
}
