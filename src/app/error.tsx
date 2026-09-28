'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Root error boundary. The real error is logged for the developer; the visitor
 * is shown a plain message and a way out, never a stack trace.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="text-slate-600">
          This page failed to load. Trying again often clears it — if it does not, please get in
          touch and we will look into it.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
        {error.digest && <p className="text-xs text-slate-400">Reference: {error.digest}</p>}
      </div>
    </div>
  );
}
