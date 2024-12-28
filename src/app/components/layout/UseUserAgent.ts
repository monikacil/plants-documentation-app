'client component'

import { useEffect, useState } from 'react'

export default function UseUserAgent() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [isIOS, setIsIOS] = useState<boolean | null>(null);
    const [isStandalone, setIsStandalone] = useState<boolean | null>(null);
    const [userAgentString, setUserAgentString] = useState<string | null>(null);

    useEffect(() => {
      if (window) {
        const userAgentString = window.navigator.userAgent;
        setUserAgentString(userAgentString);

        // Check if user agent is mobile
        const isIOS = userAgentString.match(/iPhone|iPad|iPod/i);
        const isAndroid = userAgentString.match(/Android/i);
        setIsIOS(isIOS ? true : false);
        const isMobile = isIOS || isAndroid;
        setIsMobile(!!isMobile);

        // Check if app is installed (if it's installed we wont show the prompt)
        if (window.matchMedia('(display-mode: standalone)').matches) {
          setIsStandalone(true);
        }
      }
    }, []);

    return { isMobile, isIOS, isStandalone, userAgentString }
}
