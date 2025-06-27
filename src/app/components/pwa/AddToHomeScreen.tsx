"use client";

import React, {useEffect, useState} from "react";

import {UseUserAgent} from "@/app/lib/UseUserAgent";
import {AddToMobileDevice} from "./AddToMobileDevice";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function AddToHomeScreen() {
    const [displayPrompt, setDisplayPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const {isMobile, isStandalone, isIOS} = UseUserAgent();

    const closePrompt = () => {
        setDisplayPrompt(false);
    };

    const handleInstallPrompt = async () => {
        if (!deferredPrompt) {
            return;
        }
        await deferredPrompt.prompt();
    };

    const handleListener = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
    };

    useEffect(() => {
        if (isMobile && !isStandalone) {
            setDisplayPrompt(true);
        }

        window.addEventListener("beforeinstallprompt", handleListener);
        return () => {
            document.removeEventListener("beforeinstallprompt", handleListener);
        };
    }, [isMobile, isStandalone, isIOS]);

    return (
        <>
            {displayPrompt && deferredPrompt && (
                <AddToMobileDevice
                    closePrompt={closePrompt}
                    installPrompt={handleInstallPrompt}
                />
            )}
        </>
    );
}
