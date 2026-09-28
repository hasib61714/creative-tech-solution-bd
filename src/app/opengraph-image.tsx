import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = 'Creative Tech Solution BD — web development and digital solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated from the brand's own colours rather than stock photography, so the
 * share card stays correct if the site is redeployed under a new domain.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#020617',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: 'rgba(220,38,38,0.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'rgba(29,78,216,0.32)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#f87171',
            fontWeight: 700,
            marginBottom: 28,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            lineHeight: 1.08,
            fontWeight: 800,
            color: '#ffffff',
            maxWidth: 900,
          }}
        >
          Modern websites. Smarter digital solutions.
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            color: '#94a3b8',
            marginTop: 32,
            maxWidth: 860,
          }}
        >
          Websites, software, e-commerce and AI solutions — built in Bangladesh.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 48,
            fontSize: 24,
            color: '#cbd5e1',
          }}
        >
          Led by {SITE.founder}
        </div>
      </div>
    ),
    size,
  );
}
