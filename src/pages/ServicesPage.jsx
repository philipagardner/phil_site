import PageHero from '../components/PageHero';
import PricingSection from '../components/PricingSection';

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

const steps = [
  { number: '01', title: 'Understand', description: 'Map the workflow, constraints, and what success needs to look like for the people using the product.' },
  { number: '02', title: 'Design', description: 'Shape the interaction model, responsive layout, and component approach before implementation gets noisy.' },
  { number: '03', title: 'Build', description: 'Turn the design into maintainable front-end code with accessibility, responsiveness, and reuse in mind.' },
  { number: '04', title: 'Measure', description: 'Track adoption signals, refine based on usage, and keep the UI grounded in outcomes instead of assumptions.' },
];

function ServicesPage() {
  return (
    <>
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

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How I work</p>
            <h2>A design-to-code process built for product delivery, not handoff theater.</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />
    </>
  );
}

export default ServicesPage;