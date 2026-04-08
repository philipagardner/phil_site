import PageHero from '../components/PageHero';

const skillGroups = [
  {
    title: 'Core competencies',
    items: [
      'UI/UX engineering from design through implementation',
      'Responsive, accessible interface development',
      'Agentic AI and chatbot UI component engineering',
    ],
  },
  {
    title: 'Technical toolkit',
    items: [
      'HTML, CSS, JavaScript',
      'WCAG 2.2, A2UI, AG-UI',
      'ServiceNow, Figma, Adobe Product Suite, Docker',
    ],
  },
];

const accomplishments = [
  'Owned and led end-to-end UI rebuilds across multiple internal applications, delivering cleaner and more intuitive experiences.',
  'Pioneered custom UI components for an AI chatbot using A2UI and AG-UI patterns.',
  'Created a standardized, responsive, and accessible UI component library for projects across the department.',
];

const experience = [
  {
    role: 'Software Engineer - AI Team',
    company: 'UnitedHealth Group (Optum)',
    period: 'June 2017 - April 2026',
    location: 'Raleigh, NC (Remote)',
    bullets: [
      'Designed, developed, and deployed chatbot UI that supported 2.6K IT ticketing actions, 4.4K self-help knowledge searches, and 173 PTO plans.',
      'Built custom, agent-specific UI components using A2UI and AG-UI for guided task completion inside the chatbot.',
      'Integrated telemetry capture based on definitive user interactions in the UI.',
    ],
  },
  {
    role: 'Software Engineer - User Experience Infrastructure Team',
    company: 'UnitedHealth Group (Optum)',
    period: 'June 2017 - April 2026',
    location: 'Raleigh, NC (Remote)',
    bullets: [
      'Designed and developed the UI for an internal AppStore handling 1.8 million requests per year from 300k unique recipients across 4k applications.',
      'Identified and remediated WCAG 2.2 accessibility issues while building a shared, web-accessible component library used across departmental projects.',
      'Led front-end development for an onboarding overhaul that contributed to $427k saved over three years, supported 173k new hires, and eliminated an estimated 3.7k employee hours of work.',
      'Modernized and managed a catalog of more than 100 forms handling roughly 500k requests per year.',
    ],
  },
];

function ResumePage() {
  return (
    <>
      <PageHero
        eyebrow="Resume"
        title="Phil's Resume"
        description="A web-formatted version of Phil A. Gardner's resume, focused on UX engineering, accessible front-end systems, and AI interface work."
      />

      <section className="section">
        <div className="container resume-layout">
          <article className="resume-card resume-card-hero">
            <div className="resume-intro-copy">
              <p className="eyebrow">Phil A. Gardner</p>
              <h2>Software Engineer</h2>
              <p>
                Specializing in UX design, responsive UI development, and WCAG 2.2 accessibility standards.
                Most recently focused on custom UI components for an agentic AI chatbot along with internal
                platform rebuilds and reusable front-end systems.
              </p>
            </div>
            <dl className="resume-contact-list">
              <div>
                <dt>Email</dt>
                <dd><a href="mailto:Philipgardner7@gmail.com">Philipgardner7@gmail.com</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd><a href="tel:19198173702">919-817-3702</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Raleigh, NC</dd>
              </div>
            </dl>
            <div className="resume-summary-block">
              <div className="resume-heading resume-summary-heading">
                <p className="eyebrow">Professional Summary</p>
                <h2>Design-minded front-end engineering for complex internal products.</h2>
              </div>
              <p>
                Phil specializes in UX engineering, accessible interface development, and modern front-end delivery.
                Recent work includes building custom UI components for an agentic AI chatbot, a Service Request Center,
                an AppStore, and an onboarding portal with responsive and reusable design patterns.
              </p>
            </div>
          </article>

          <div className="resume-grid resume-grid-stack">
            <article className="resume-card">
              <div className="resume-heading">
                <p className="eyebrow">Career Highlights</p>
                <h2>Resume-backed outcomes.</h2>
              </div>
              <div className="resume-metrics">
                <div>
                  <span>AppStore requests/year</span>
                  <strong>1.8M</strong>
                </div>
                <div>
                  <span>Unique recipients</span>
                  <strong>300K</strong>
                </div>
                <div>
                  <span>Applications supported</span>
                  <strong>4K</strong>
                </div>
                <div>
                  <span>AI ticketing actions</span>
                  <strong>2.6K</strong>
                </div>
                <div>
                  <span>Knowledge searches</span>
                  <strong>4.4K</strong>
                </div>
                <div>
                  <span>Cost savings</span>
                  <strong>$427K</strong>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container resume-grid">
          {skillGroups.map((group) => (
            <article className="resume-card" key={group.title}>
              <div className="resume-heading">
                <p className="eyebrow">Skills</p>
                <h2>{group.title}</h2>
              </div>
              <ul className="resume-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container resume-layout">
          <article className="resume-card">
            <div className="resume-heading">
              <p className="eyebrow">Accomplishments</p>
              <h2>Selected contributions.</h2>
            </div>
            <ul className="resume-list">
              {accomplishments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="resume-card">
            <div className="resume-heading">
              <p className="eyebrow">Education</p>
              <h2>Appalachian State University</h2>
            </div>
            <p>Bachelor of Science in Business Administration - Computer Information Systems</p>
            <p>Boone, NC</p>
          </article>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading resume-section-heading">
            <p className="eyebrow">Professional Experience</p>
            <h2>Enterprise-scale UI work across AI and internal product teams.</h2>
          </div>
          <div className="resume-timeline">
            {experience.map((item) => (
              <article className="resume-card" key={`${item.company}-${item.role}`}>
                <div className="resume-experience-head">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                  </div>
                  <div className="resume-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <ul className="resume-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ResumePage;