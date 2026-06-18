import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const S = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
    fontFamily: 'Inter, sans-serif',
  },

  // ── Sidebar ─────────────────────────────────────────
  sidebar: {
    width: '220px',
    backgroundColor: '#ffffff',
    borderRight: '0.5px solid rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '18px 16px',
    borderBottom: '0.5px solid rgba(0,0,0,0.06)',
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
    flexShrink: 0,
  },
  logoText: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navLabel: {
    fontSize: '11px',
    color: '#aaa',
    fontWeight: '500',
    letterSpacing: '0.06em',
    padding: '8px 8px 4px',
    textTransform: 'uppercase',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    padding: '8px 10px',
    borderRadius: '8px',
    fontSize: '13.5px',
    color: '#555',
    textDecoration: 'none',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.1s',
  },
  navLinkActive: {
    backgroundColor: '#f0effd',
    color: '#534AB7',
    fontWeight: '500',
  },
  navIcon: {
    fontSize: '16px',
    flexShrink: 0,
  },
  sidebarBottom: {
    padding: '12px 8px',
    borderTop: '0.5px solid rgba(0,0,0,0.06)',
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 10px',
    borderRadius: '8px',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#EEEDFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: '#3C3489',
    flexShrink: 0,
  },
  userName: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  userRole: {
    fontSize: '11px',
    color: '#888',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    padding: '8px 10px',
    borderRadius: '8px',
    fontSize: '13.5px',
    color: '#c0392b',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    width: '100%',
    marginTop: '2px',
  },

  // ── Main area ───────────────────────────────────────
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  topbar: {
    height: '52px',
    backgroundColor: '#ffffff',
    borderBottom: '0.5px solid rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  },
  pageTitle: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  bellBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#666',
    padding: '4px',
    borderRadius: '6px',
  },
  content: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  },
}

const navItems = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard', icon: '⊞', text: 'Dashboard' },
      { to: '/analytics', icon: '◈', text: 'Analytics' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { to: '/users', icon: '◎', text: 'Users' },
      { to: '/orders', icon: '◷', text: 'Orders' },
      { to: '/products', icon: '▦', text: 'Products' },
    ],
  },
  { label: 'System', items: [{ to: '/settings', icon: '⚙', text: 'Settings' }] },
]

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/users': 'Users',
  '/orders': 'Orders',
  '/products': 'Products',
  '/settings': 'Settings',
}

export default function MainLayout() {
  const navigate = useNavigate()
  const [currentPath] = useState(() => window.location.pathname)

  const handleLogout = () => {
    // clear auth token / zustand store here
    navigate('/login')
  }

  const activeTitle = pageTitles[currentPath] ?? 'Dashboard'

  return (
    <div style={S.root}>
      {/* ── Sidebar ── */}
      <aside style={S.sidebar}>
        {/* Logo */}
        <div style={S.sidebarLogo}>
          <div style={S.logoIcon}>⚡</div>
          <span style={S.logoText}>MyApp</span>
        </div>

        {/* Nav groups */}
        <nav style={S.nav}>
          {navItems.map((group) => (
            <div key={group.label}>
              <div style={S.navLabel}>{group.label}</div>
              {group.items.map(({ to, icon, text }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    ...S.navLink,
                    ...(isActive ? S.navLinkActive : {}),
                  })}
                >
                  <span style={S.navIcon}>{icon}</span>
                  {text}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* User + logout */}
        <div style={S.sidebarBottom}>
          <div style={S.userRow}>
            <div style={S.avatar}>AJ</div>
            <div>
              <div style={S.userName}>Ajay</div>
              <div style={S.userRole}>Admin</div>
            </div>
          </div>
          <button style={S.logoutBtn} onClick={handleLogout}>
            <span style={S.navIcon}>⇥</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={S.main}>
        {/* Topbar */}
        <header style={S.topbar}>
          <span style={S.pageTitle}>{activeTitle}</span>
          <div style={S.topbarRight}>
            <button style={S.bellBtn} aria-label="Notifications">
              🔔
            </button>
            <div style={S.avatar}>AJ</div>
          </div>
        </header>

        {/* Page content via Outlet */}
        <main style={S.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
