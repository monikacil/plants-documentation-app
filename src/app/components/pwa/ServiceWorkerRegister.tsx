"use client";

import {useEffect} from "react";

export function ServiceWorkerRegister() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            if (process.env.NODE_ENV === "production") {
                navigator.serviceWorker
                    .register("/service-worker.js")
                    .catch((err) =>
                        console.error("Service worker registration failed:", err)
                    );
            } else {
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister();
                    });
                });
            }
        }
    }, []);

    return null;
}
