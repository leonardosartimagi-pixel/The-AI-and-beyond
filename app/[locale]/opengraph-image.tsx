/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

export const alt = 'The AI and Beyond';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isItalian = locale === 'it';

  const logoData = await fetch(
    new URL('../../public/icon-512.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f75',
        backgroundImage:
          'linear-gradient(135deg, #0f1a3e 0%, #1b2f75 45%, #2d388a 100%)',
      }}
    >
      {/* Accent line at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          display: 'flex',
          backgroundImage:
            'linear-gradient(90deg, #2d388a 0%, #137dc5 30%, #00aeef 50%, #137dc5 70%, #2d388a 100%)',
        }}
      />

      {/* @ts-expect-error -- Satori accepts ArrayBuffer as img src */}
      <img
        src={logoData}
        alt=""
        width={160}
        height={160}
        style={{ marginBottom: 32 }}
      />

      {/* Brand name */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}
      >
        The AI and Beyond
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 400,
          color: '#00aeef',
          letterSpacing: '0.04em',
        }}
      >
        {isItalian
          ? 'Consulenza e Sviluppo AI per il tuo Business'
          : 'AI Consulting & Development for your Business'}
      </div>

      {/* Domain */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          fontSize: 18,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.08em',
        }}
      >
        theaiandbeyond.it
      </div>
    </div>,
    { ...size }
  );
}
