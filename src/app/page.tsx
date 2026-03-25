'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    const browserLang = navigator.language || 'en';
    const targetLocale = browserLang.startsWith('ar') ? 'ar' : 'en';
    window.location.replace(`/${targetLocale}/`);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        color: '#fff',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            border: '3px solid #7c3aed',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: '#a78bfa', fontSize: 14 }}>Loading UniVerse...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
