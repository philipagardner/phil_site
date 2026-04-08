import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';

const highlights = [
  {
    title: 'UX engineering',
    description: 'I translate ambiguous product needs into polished, production-ready interfaces with strong interaction detail.',
  },
  {
    title: 'Accessible front-end systems',
    description: 'Responsive components, WCAG 2.2 implementation, and reusable patterns that scale across teams and products.',
  },
  {
    title: 'Agentic AI interfaces',
    description: 'Custom chat experiences, agent-specific UI components, and telemetry-aware interface design for AI products.',
  },
];

const reasons = [
  {
    title: 'Designed for real workflows',
    description: 'My best work lives in high-friction operational spaces where interfaces need to reduce confusion and speed up action.',
  },
  {
    title: 'Accessibility built into the process',
    description: 'I do not treat accessibility as a late-stage audit. It is part of the component model, interaction model, and QA standard.',
  },
  {
    title: 'Measured product impact',
    description: 'I care about shipped outcomes, adoption, and the signals that prove whether a UI is actually improving work.',
  },
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">UX engineering, accessibility, AI product UI</p>
            <h1>I build interfaces that make complex enterprise work feel clear.</h1>
            <p className="hero-text">
              I am Phil Gardner, a software engineer focused on responsive front-end development, WCAG 2.2 accessibility, and custom UI for agentic AI experiences.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/work">View Selected Work</Link>
              <a className="button button-secondary" href="mailto:Philipgardner7@gmail.com">Start a Conversation</a>
            </div>
            <ul className="hero-points">
              <li>WCAG 2.2 implementation</li>
              <li>AI chat UI components</li>
              <li>Design-to-code execution</li>
            </ul>
          </div>
          <div className="hero-panel">
            <div className="panel-card panel-card-accent">
              <p>AppStore demand handled</p>
              <strong>1.8M</strong>
              <span>Annual requests supported by an internal experience I helped redesign and modernize.</span>
            </div>
            <div className="panel-stack">
              <div className="panel-card">
                <p>AI-assisted ticket actions</p>
                <strong>2.6K</strong>
              </div>
              <div className="panel-card">
                <p>PTO plans completed</p>
                <strong>173</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What I do</p>
            <h2>Front-end work for product teams that need clarity, speed, and polish.</h2>
          </div>
          <div className="card-grid three-up">
            {highlights.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Why teams bring me in</p>
            <h2>I work well where product complexity, accessibility, and delivery pressure overlap.</h2>
          </div>
          <div className="feature-list">
            {reasons.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="section">
        <div className="container cta-banner">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>If you need a front-end engineer who can own the experience end to end, let’s talk.</h2>
          </div>
          <a className="button button-primary" href="mailto:Philipgardner7@gmail.com">Email Phil</a>
        </div>
      </section>
    </>
  );
}

export default HomePage;