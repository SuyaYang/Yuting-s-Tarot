import React from 'react'

type Props = {
  onBack: () => void
}

/**
 * About page — semantic, centered layout with clear spacing.
 * Keeps decorative elements but avoids absolute positioning for main content.
 */
const About: React.FC<Props> = ({ onBack }) => {
  return (
    <main className="about-page" role="main">
      <section className="about-inner">
        <header className="about-header">
          <div className="about-decor" aria-hidden="true" />
          <h1 className="about-title">About</h1>
        </header>

        <div className="about-divider" aria-hidden="true" />

        <article className="about-text" aria-label="About Positive Tarot">
          <p>
            Positive Tarot was created to inspire <strong>reflection, healing</strong>, and <strong>hope</strong>. Each
            card serves as a mirror — not of fate, but of possibility — helping you uncover your strengths,
            understand your emotions, and connect with your inner wisdom.
          </p>

          <p>
            Designed by a tarot lover who believes in using the language of the cards to
            <strong> share positivity</strong>, <strong>encouragement</strong>, and <strong>heartfelt wisdom</strong>,
            Positive Tarot transforms traditional symbolism into a source of light for everyday life.
          </p>
        </article>

        <nav className="about-controls" aria-label="About actions">
          <button className="btn" onClick={onBack}>Back</button>
        </nav>
      </section>
    </main>
  )
}

export default About
