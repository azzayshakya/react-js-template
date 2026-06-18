import { useNavigate } from 'react-router-dom'

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f0',
    fontFamily: 'Inter, sans-serif',
  },

  // ── Navbar ──────────────────────────────────────────
  nav: {
    height: '56px',
    backgroundColor: '#ffffff',
    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    textDecoration: 'none',
  },
  navLogoIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#EEEDFE',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  navLink: {
    fontSize: '14px',
    color: '#666',
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  navLinkActive: {
    fontSize: '14px',
    color: '#1a1a1a',
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    background: '#f0f0ec',
    cursor: 'pointer',
    fontWeight: '500',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#EEEDFE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '500',
    color: '#3C3489',
  },
  logoutBtn: {
    fontSize: '13px',
    color: '#c0392b',
    padding: '6px 14px',
    borderRadius: '8px',
    border: '0.5px solid #f1b0b0',
    background: 'transparent',
    cursor: 'pointer',
  },

  // ── Page ────────────────────────────────────────────
  page: {
    padding: '28px 24px',
  },
  pageTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  pageSub: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '24px',
  },

  // ── Stat cards ──────────────────────────────────────
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '16px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '6px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#1a1a1a',
  },
  statUp: {
    fontSize: '12px',
    color: '#1D9E75',
    marginTop: '4px',
  },
  statDown: {
    fontSize: '12px',
    color: '#E24B4A',
    marginTop: '4px',
  },

  // ── Bottom cards ────────────────────────────────────
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '16px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '14px',
  },

  // ── Table ───────────────────────────────────────────
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    fontSize: '12px',
    color: '#888',
    fontWeight: '400',
    textAlign: 'left',
    padding: '0 0 10px',
    borderBottom: '0.5px solid rgba(0,0,0,0.08)',
  },
  td: {
    fontSize: '13px',
    color: '#1a1a1a',
    padding: '10px 0',
    borderBottom: '0.5px solid rgba(0,0,0,0.06)',
  },

  // ── Badges ──────────────────────────────────────────
  badgeSuccess: {
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '99px',
    backgroundColor: '#E1F5EE',
    color: '#0F6E56',
  },
  badgeWarn: {
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '99px',
    backgroundColor: '#FAEEDA',
    color: '#854F0B',
  },
  badgeInfo: {
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '99px',
    backgroundColor: '#E6F1FB',
    color: '#185FA5',
  },

  // ── Activity ────────────────────────────────────────
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '10px 0',
    borderBottom: '0.5px solid rgba(0,0,0,0.06)',
  },
  actDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginTop: '5px',
    flexShrink: 0,
  },
  actText: {
    fontSize: '13px',
    color: '#1a1a1a',
    lineHeight: '1.4',
  },
  actTime: {
    fontSize: '12px',
    color: '#888',
    marginTop: '2px',
  },
}

const stats = [
  { label: 'Total users', value: '12,482', change: '+8.2% this week', type: 'up' },
  { label: 'Revenue', value: '$48,290', change: '+3.1% this week', type: 'up' },
  { label: 'Active sessions', value: '1,094', change: '-1.4% today', type: 'down' },
  { label: 'Open tickets', value: '23', change: '+5 since yesterday', type: 'up' },
]

const orders = [
  { id: '#10821', customer: 'Rahul Sharma', amount: '$240', status: 'Completed' },
  { id: '#10820', customer: 'Priya Mehta', amount: '$89', status: 'Pending' },
  { id: '#10819', customer: 'Arjun Nair', amount: '$512', status: 'Completed' },
  { id: '#10818', customer: 'Sneha Reddy', amount: '$175', status: 'Processing' },
  { id: '#10817', customer: 'Vikram Das', amount: '$340', status: 'Completed' },
]

const activity = [
  { text: 'New user registered', time: '2 mins ago', color: '#1D9E75' },
  { text: 'Order #10821 completed', time: '14 mins ago', color: '#378ADD' },
  { text: 'Payment pending review', time: '1 hr ago', color: '#BA7517' },
  { text: 'Server CPU spike 94%', time: '2 hrs ago', color: '#E24B4A' },
  { text: 'Deploy successful — v3.0', time: '3 hrs ago', color: '#1D9E75' },
]

const navLinks = ['Dashboard', 'Users', 'Analytics', 'Settings']

const badgeStyle = (status) => {
  if (status === 'Completed') return styles.badgeSuccess
  if (status === 'Pending') return styles.badgeWarn
  if (status === 'Processing') return styles.badgeInfo
  return styles.badgeInfo
}

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // clear your auth state / token here
    navigate('/login')
  }

  return (
    <div style={styles.wrapper}>
      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <div style={styles.navLogoIcon}>⚡</div>
          MyApp
        </div>

        <div style={styles.navLinks}>
          {navLinks.map((link) => (
            <button key={link} style={link === 'Dashboard' ? styles.navLinkActive : styles.navLink}>
              {link}
            </button>
          ))}
        </div>

        <div style={styles.navRight}>
          <div style={styles.avatar}>AJ</div>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ── Page content ── */}
      <div style={styles.page}>
        <p style={styles.pageTitle}>Good morning, Ajay</p>
        <p style={styles.pageSub}>Here's what's happening today.</p>

        {/* Stat cards */}
        <div style={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statLabel}>{s.label}</div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={s.type === 'up' ? styles.statUp : styles.statDown}>
                {s.type === 'up' ? '↑' : '↓'} {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom cards */}
        <div style={styles.cardsGrid}>
          {/* Orders table */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Recent orders</div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td style={styles.td}>{o.id}</td>
                    <td style={styles.td}>{o.customer}</td>
                    <td style={styles.td}>{o.amount}</td>
                    <td style={styles.td}>
                      <span style={badgeStyle(o.status)}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity feed */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Recent activity</div>
            {activity.map((a, i) => (
              <div
                key={i}
                style={{
                  ...styles.activityItem,
                  ...(i === activity.length - 1 ? { borderBottom: 'none' } : {}),
                }}
              >
                <div style={{ ...styles.actDot, backgroundColor: a.color }} />
                <div>
                  <div style={styles.actText}>{a.text}</div>
                  <div style={styles.actTime}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
