'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = 'G-8Y6T7J4893';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!(window as any).gtag) return;

    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
