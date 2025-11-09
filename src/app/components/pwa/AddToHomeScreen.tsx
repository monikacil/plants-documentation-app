"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/app/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms?: string[];
  readonly userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;

  prompt(): Promise<void>;
}

const STORAGE_KEYS = {
  installed: "pwaInstalled",
  dismissedAt: "pwaA2HS_lastDismissedAt",
} as const;

const DISMISS_COOLDOWN_DAYS = 7;

function daysSince(ts: number): number {
  return (Date.now() - ts) / (1000 * 60 * 60 * 24);
}

export function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosHelpOpen, setIosHelpOpen] = useState(false);
  const [canShow, setCanShow] = useState<boolean>(true);

  const env = useMemo(() => {
    if (typeof window === "undefined") {
      return { isStandalone: true, isAndroid: false, isIOS: false, isSafari: false };
    }

    const ua = window.navigator.userAgent || "";
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)")?.matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone;

    const isAndroid = /android/i.test(ua);
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isSafari =
      /^((?!chrome|crios|fxios|edgios).)*safari/i.test(ua) ||
      (isIOS && !/crios|fxios|edgios/i.test(ua));

    return { isStandalone, isAndroid, isIOS, isSafari };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEYS.dismissedAt);
    const dismissedAt = Number(raw || 0);
    setCanShow(!dismissedAt || daysSince(dismissedAt) > DISMISS_COOLDOWN_DAYS);
  }, []);

  useEffect(() => {
    if (env.isStandalone) return;
    if (!canShow) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const handleInstalled = () => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEYS.installed, "true");
      }
      setDeferredPrompt(null);
      setVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    // iOS Safari – pokazuj baner ręcznie
    if (env.isIOS && env.isSafari) {
      setDeferredPrompt(null);
      setVisible(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, [env.isStandalone, env.isIOS, env.isSafari, canShow]);

  if (!visible) return null;

  const onClose = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEYS.dismissedAt, String(Date.now()));
    }
    setVisible(false);
  };

  const onInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const res = await deferredPrompt.userChoice;
      if (res?.outcome === "accepted") setVisible(false);
      else onClose();
    } finally {
      setDeferredPrompt(null);
    }
  };

  const Banner: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      className="
        m-auto my-2 -translate-x-1/2 z-50
        card animate-slide-up
        border border-border-light dark:border-border-dark
        backdrop-blur-md
        px-4 py-3 flex items-center gap-4
        max-w-[92vw] md:max-w-xl w-fit
      "
      role="dialog"
      aria-live="polite"
      aria-label="Add to Home Screen"
    >
      { children }
      <button
        onClick={ onClose }
        aria-label="Close"
        className="ml-1 rounded-full px-2 py-1 text-sm text-muted-light hover:text-text-light
                   dark:text-muted-dark dark:hover:text-text-dark transition"
      >
        ✕
      </button>
    </div>
  );

  /** --- Android --- */
  if (env.isAndroid && deferredPrompt) {
    return (
      <Banner>
        <p className="text-sm font-medium">
          🌱 Install <span className="font-semibold">PlantsDoc</span> on your home screen
        </p>
        <Button size="lg" onClick={ onInstallClick } className="w-fit px-3 py-1">
          Install
        </Button>
      </Banner>
    );
  }

  /** --- iOS Safari --- */
  if (env.isIOS && !env.isStandalone) {
    return (
      <>
        <Banner>
          <div className="flex items-center gap-3">
            <div className="text-xl" aria-hidden>
              📱
            </div>
            <div className="text-sm">
              <div className="font-semibold">Add PlantsDoc to your Home Screen</div>
              <div className="opacity-80">
                Tap <span className="font-medium">Share</span> → “Add to Home Screen”
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline" className="w-fit" onClick={ () => setIosHelpOpen(true) }>
            How to
          </Button>
        </Banner>

        { iosHelpOpen && (
          <div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            onClick={ () => setIosHelpOpen(false) }
          >
            <div
              className="card w-full max-w-md p-6 border border-border-light dark:border-border-dark animate-pop-in"
              onClick={ (e) => e.stopPropagation() }
            >
              <h3 className="text-lg font-semibold mb-3">How to add PlantsDoc on iOS (Safari)</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>
                  Tap the <span className="font-medium">Share</span> icon (a square with an arrow pointing up) in
                  Safari.
                </li>
                <li>
                  Scroll and select <span className="font-medium">“Add to Home Screen”</span>.
                </li>
                <li>
                  Confirm the name and tap <span className="font-medium">“Add”</span>.
                </li>
              </ol>
              <div className="mt-5 flex justify-end gap-2">
                <Button size="sm" variant="outline" className="w-fit" onClick={ () => setIosHelpOpen(false) }>
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) }
      </>
    );
  }

  return null;
}
