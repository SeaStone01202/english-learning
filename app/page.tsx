import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to English Learning App</h1>
        <p className="hero-subtitle">
          Master English through interactive exercises
        </p>
        <p className="hero-description">
          Practice grammar, vocabulary, speaking, and listening skills with our
          interactive learning platform. Track your progress and improve every
          day.
        </p>
      </div>

      <div className="features-grid">
        <Link href="/practice" className="feature-card">
          <div className="feature-icon">📝</div>
          <h2>Practice</h2>
          <p>
            Generate exercises based on your skill level and topic. Get instant
            feedback and explanations.
          </p>
          <span className="feature-link">Start Practicing →</span>
        </Link>

        <Link href="/history" className="feature-card">
          <div className="feature-icon">📊</div>
          <h2>History</h2>
          <p>
            View your past practice sessions, track your scores, and monitor
            your progress over time.
          </p>
          <span className="feature-link">View History →</span>
        </Link>

        <Link href="/settings" className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h2>Settings</h2>
          <p>
            Manage your preferences, store your API key securely, and customize
            your learning experience.
          </p>
          <span className="feature-link">Go to Settings →</span>
        </Link>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <p>
          Click below to begin your English learning journey with our
          interactive exercises.
        </p>
        <Link href="/practice" className="cta-button">
          Start Practice Now
        </Link>
      </div>
    </div>
  );
}
