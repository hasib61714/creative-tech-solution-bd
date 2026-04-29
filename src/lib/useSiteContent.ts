'use client';

import { useEffect, useState } from 'react';
import { CONTENT_DEFAULTS, SiteContent } from './content-defaults';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>({ ...CONTENT_DEFAULTS });

  useEffect(() => {
    let active = true;
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (active) setContent((current) => ({ ...current, ...data }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return content;
}
