import './AboutUs.css'

// ---- palette pulled from the project's own theme tokens (global.css) ----
// Every value here is a CSS variable reference, so the page follows
// [data-scheme='dark' | 'light'] automatically — no hardcoded hex.
const colors = {
  bg: 'var(--color-bg)',
  ring: 'var(--term-green)',
  ringDim: 'var(--term-green-dim)',
  ringSoft: 'var(--primitive-green-300)',
  accent: 'var(--color-primary)',
  onAccent: 'var(--color-bg)',
  text: 'var(--color-text)',
  textMuted: 'var(--color-text-secondary)',
  textMuted2: 'var(--color-text-muted)',
  cardBg: 'var(--color-bg-container)',
  cardBorder: 'var(--color-border)',
  cardBorderStrong: 'var(--color-border-secondary)',
  navBg: 'var(--color-bg-container)',
  navText: 'var(--color-text)',
  navTextMuted: 'var(--color-text-secondary)',
}

const SERVICES = [
  {
    title: 'Delivering seamless\nexperiences',
    body: 'We make it easy. Complex workflows become effortless progress from the very first click.',
  },
  {
    title: 'Orchestrating\nunified frameworks',
    body: 'We keep it simple. One system replaces the tangle of typed limitations you inherited.',
  },
  {
    title: 'Compounding\npartnership gains',
    body: 'We go far by going together. Every engagement compounds into something that lasts.',
  },
]

function Star({ top, left, size = 4, delay = 0 }) {
  return (
    <span
      className="eh-star"
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--term-green)',
        boxShadow: '0 0 6px 1px rgba(57, 255, 106, 0.7)',
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export default function AboutUs() {
  return (
    <div
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        fontFamily:
          '"Poppins", "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflowX: 'hidden',
      }}
    >
      {/* ---------- Nav ---------- */}
      <div style={{ padding: '20px clamp(16px, 4vw, 40px) 0' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '760px',
            margin: '0 auto',
            padding: '10px 10px 10px 20px',
            borderRadius: '999px',
            backgroundColor: colors.navBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '0.95rem',
              color: colors.navText,
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 90deg, var(--term-green), var(--primitive-green-300), var(--term-green-dim), var(--term-green))',
                display: 'inline-block',
                boxShadow: `0 0 0 3px ${colors.navBg} inset, var(--color-glow)`,
              }}
            />
            Eterna Cloud
          </div>

          <nav
            className="eh-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '26px',
              fontSize: '0.82rem',
              color: colors.navTextMuted,
              fontWeight: 500,
            }}
          >
            <a href="#solution" className="eh-nav-link" style={{ color: colors.navTextMuted }}>
              Our Solution
            </a>
            <a href="#experience" className="eh-nav-link" style={{ color: colors.navTextMuted }}>
              Key Experience
            </a>
            <a href="#about" className="eh-nav-link" style={{ color: colors.navTextMuted }}>
              About Us
            </a>
          </nav>

          <a
            href="#contact"
            className="eh-btn-contact"
            style={{
              backgroundColor: colors.accent,
              color: colors.onAccent,
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '10px 24px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Contact
          </a>
        </header>
      </div>

      {/* ---------- Hero ---------- */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(48px, 10vw, 90px) 20px clamp(56px, 8vw, 80px)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* warm glow blob, upper right */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-15%',
            width: '55vw',
            maxWidth: '520px',
            height: '55vw',
            maxHeight: '520px',
            borderRadius: '50%',
            background: `radial-gradient(circle, color-mix(in srgb, ${colors.ring} 30%, transparent) 0%, color-mix(in srgb, ${colors.ringDim} 25%, transparent) 45%, transparent 72%)`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        {/* crescent ring */}
        <div
          className="eh-ring"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(420px, 78vw)',
            height: 'min(420px, 78vw)',
            borderRadius: '50%',
            background: `conic-gradient(from 200deg, transparent 0deg, ${colors.ring} 60deg, ${colors.ringDim} 130deg, transparent 210deg, transparent 360deg)`,
            filter: 'blur(2px)',
            pointerEvents: 'none',
            WebkitMask:
              'radial-gradient(circle, transparent 60%, black 61%, black 64%, transparent 65%)',
            mask: 'radial-gradient(circle, transparent 60%, black 61%, black 64%, transparent 65%)',
          }}
        />

        <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto' }}>
          <p
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '18px',
              backgroundImage: `linear-gradient(90deg, ${colors.ringSoft} 0%, ${colors.ring} 50%, ${colors.ringDim} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Our business is clarity, consistency &amp; unity
          </p>

          <h1
            className="eh-headline"
            style={{
              fontSize: 'clamp(1.9rem, 5vw, 2.5rem)',
              lineHeight: 1.25,
              fontWeight: 600,
              color: colors.text,
              margin: 0,
            }}
          >
            We are value creators
            <br />
            with hyperfocus
          </h1>
        </div>

        {/* offer badge + section heading */}
        <div style={{ position: 'relative', marginTop: 'clamp(70px, 12vw, 120px)' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: colors.textMuted,
              backgroundColor: 'var(--color-bg-hover)',
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '18px',
            }}
          >
            ✦ What we offer
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              fontWeight: 600,
              margin: 0,
            }}
          >
            One service
          </h2>
        </div>
      </section>

      {/* ---------- Cards ---------- */}
      <section
        style={{
          padding: '0 20px clamp(56px, 8vw, 90px)',
          maxWidth: '1080px',
          margin: '0 auto',
        }}
      >
        <div
          className="eh-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '18px',
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="eh-card"
              style={{
                position: 'relative',
                minHeight: '260px',
                borderRadius: '20px',
                padding: '22px',
                border: `1px solid ${colors.cardBorder}`,
                background: `linear-gradient(180deg, ${colors.cardBg} 0%, ${colors.cardBg} 55%, color-mix(in srgb, ${colors.ring} 16%, ${colors.cardBg}) 130%)`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* faint radiating line pattern */}
              <svg
                aria-hidden="true"
                width="100%"
                height="140"
                viewBox="0 0 240 140"
                style={{ position: 'absolute', top: 0, left: 0, opacity: 0.35 }}
              >
                {Array.from({ length: 7 }).map((_, k) => (
                  <path
                    key={k}
                    d={`M ${20 + i * 10} 0 Q ${120} ${60 + k * 6} ${240} ${20 + k * 14}`}
                    style={{ stroke: colors.cardBorderStrong }}
                    strokeWidth="0.6"
                    fill="none"
                  />
                ))}
              </svg>

              <Star top={i === 0 ? 30 : 18} left={i === 1 ? 28 : 18} size={i === 0 ? 10 : 6} />
              <Star top={i === 2 ? 20 : 70} left={i === 2 ? 130 : 45} size={5} delay={0.6} />
              {i === 1 && <Star top={40} left={165} size={12} delay={0.3} />}

              <h3
                style={{
                  position: 'relative',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: colors.text,
                  margin: '0 0 10px',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.35,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  position: 'relative',
                  fontSize: '0.82rem',
                  lineHeight: 1.55,
                  color: colors.textMuted,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Closing statement ---------- */}
      <section
        style={{
          padding: '0 20px clamp(70px, 10vw, 110px)',
          textAlign: 'center',
        }}
      >
        <div
          className="eh-icon-float"
          aria-hidden="true"
          style={{
            width: 34,
            height: 34,
            margin: '0 auto 28px',
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, ${colors.ring}, ${colors.ringDim} 70%)`,
            boxShadow: `0 0 24px 4px color-mix(in srgb, ${colors.ring} 40%, transparent)`,
          }}
        />
        <p
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            fontSize: 'clamp(1.1rem, 2.6vw, 1.35rem)',
            fontWeight: 500,
            lineHeight: 1.5,
            color: colors.text,
          }}
        >
          We set out to create the ideal business scenario. The one that turns isolated moments of
          excellence into a{' '}
          <span style={{ color: colors.textMuted2 }}>
            single, dependable rhythm your whole team can trust.
          </span>
        </p>
      </section>
    </div>
  )
}
