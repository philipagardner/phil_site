import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import PageHero from '../components/PageHero';
import PricingSection from '../components/PricingSection';
import { useState, useEffect } from 'react';

const services = [
  {
    title: 'Agentic AI chatbot UI',
    description: 'Custom front-end components for an AI assistant experience built to help employees complete real tasks, not just ask questions.',
    items: ['A2UI and AG-UI component work', 'Agent-specific interface patterns', 'Interaction telemetry based on definitive UI actions'],
  },
  {
    title: 'Internal AppStore redesign',
    description: 'A modernized internal marketplace experience serving a large employee base with clearer navigation and stronger UI consistency.',
    items: ['1.8M annual requests', '300k unique recipients', '4k application catalog support'],
  },
  {
    title: 'Onboarding portal overhaul',
    description: 'Responsive onboarding flows that reduced friction for new hires and cut operational waste across a large internal process.',
    items: ['$427k saved over 3 years', '173k new hires supported', 'Estimated 3.7k employee hours saved'],
  },
  {
    title: 'Accessible component library',
    description: 'A standardized UI foundation created to improve consistency, responsiveness, and WCAG compliance across departmental projects.',
    items: ['Reusable front-end patterns', 'Web accessibility remediation', 'Shared UI standards for multiple apps'],
  },
];

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

const workProcess = [
  {
    title: 'Design',
    icon: '✏️',
    items: ['Mockups', 'User Interviews', 'Persona Analysis'],
  },
  {
    title: 'Development',
    icon: '⚡',
    items: ['HTML/CSS code', 'Back-end Integration', 'Accessibility Standard Implementation'],
  },
  {
    title: 'Deployment',
    icon: '🚀',
    items: ['Version Controlled Iterative Releases', 'QE Testing & Stakeholder Review', 'Production-ready Code'],
  },
];

function WorkProcessAnimation() {
  return (
    <div className="work-process">
      <div className="process-list">
        {workProcess.map((step, index) => (
          <div 
            key={step.title} 
            className="process-card"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="process-header">
              <div className="process-icon">{step.icon}</div>
              <h3 className="process-title">{step.title}</h3>
            </div>
            <div className="process-items">
              {step.items.map((item, i) => (
                <div 
                  key={item} 
                  className="process-item"
                  style={{ animationDelay: `${index * 0.3 + 0.2 + i * 0.15}s` }}
                >
                  <span className="item-bullet">●</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">UI/UX Development, AI Component Integration, Accessibility Specialist</p>
            <h1>I make websites look better and feel easier.</h1>
            <p className="hero-text">
              I am Phil Gardner, a software engineer focused on responsive front-end development, WCAG 2.2 accessibility, and custom UI for agentic AI experiences.
            </p>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <p>AppStore demand handled</p>
              <strong>1.8M</strong>
              <span>Annual requests supported by an the internal AppStore that I designed & co-developed.</span>
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

      {/* <section className="section section-alt temp-section">
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
      </section> */}

            <section className="section">
        <div className="container cta-banner">
          <div className="flex-5">
            <h2>I can deliver the entire process </h2>
            <div className="brag-text">
              <ol className='phil-ol'>
                <li>UX design and prototyping</li>
                <li>Production-ready front-end code</li>
                <li>Accessibility implementation and testing</li>
                <li>Software deployment and monitoring</li>
              </ol>
            </div>
          </div>
          <div className="flex-1 flex-space-evenly">
          <a className="button button-primary" href="mailto:Philipgardner7@gmail.com">Email Me</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>What I do.</h2>
          </div>
          <WorkProcessAnimation />
        </div>
      </section>

      <TestimonialsSection />

      <PageHero
        eyebrow="Work"
        title="Selected work across AI chat, internal platforms, and accessible front-end systems."
        description="The common thread is clear: complex enterprise experiences rebuilt to be more usable, more consistent, and easier to scale."
      />

      <section className="section">
        <div className="container card-grid two-up">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <PricingSection />

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

    </>
  );
}

export default HomePage;