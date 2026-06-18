import { Outlet } from 'react-router-dom'

const S = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
  },

  // ── Top bar (minimal branding) ──────────────────────
  topbar: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#EEEDFE',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  logoText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a1a1a',
  },

  // ── Centered content area ───────────────────────────
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.1)',
    borderRadius: '16px',
    padding: '36px',
    width: '100%',
    maxWidth: '400px',
  },

  // ── Footer ──────────────────────────────────────────
  footer: {
    padding: '16px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#aaa',
  },
}

export default function AuthLayout() {
  return (
    <div style={S.wrapper}>
      {/* Minimal top branding */}
      <div style={S.topbar}>
        <div style={S.logoIcon}>⚡</div>
        <span style={S.logoText}>MyApp</span>
      </div>

      {/* Auth pages (Login / Register / ForgotPassword) render here */}
      <div style={S.center}>
        <div style={S.card}>
          <Outlet />
        </div>
      </div>

      <div style={S.footer}>© {new Date().getFullYear()} MyApp. All rights reserved.</div>
    </div>
  )
}
