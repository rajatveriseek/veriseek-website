// app/analytics.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-DJ59N085L0'; // Replace with your own ID
declare const window: any;
export function GoogleAnalytics() {
  const pathname = usePathname();
    
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('config', GA_TRACKING_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
