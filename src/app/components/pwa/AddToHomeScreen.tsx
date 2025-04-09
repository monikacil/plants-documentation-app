"use client";

import React, { useState, useEffect } from "react";

import useUserAgent from "@/lib/UseUserAgent";
import AddToMobileDevice from "./AddToMobileDevice";

export default function AddToHomeScreen() {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { isMobile, isStandalone, isIOS } = useUserAgent();

  const closePrompt = () => {
    setDisplayPrompt(false);
  };

  const handleInstallPrompt = async () => {
    if (!deferredPrompt) {
      return;
    }
    const result = await deferredPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
  };

  const handleListener = (e: Event) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };

  useEffect(() => {
    // Only show prompt if user is on mobile and app is not installed
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
