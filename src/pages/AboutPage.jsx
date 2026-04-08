import PageHero from '../components/PageHero';
import CaseStudiesSection from '../components/CaseStudiesSection';

const approach = [
  {
    title: 'Workflow first',
    description: 'I start with the job the user is trying to complete and shape the interface around that path.' ,
  },
  {
    title: 'Accessibility as engineering',
    description: 'WCAG compliance is part of the component model, not a retroactive checklist layered on after release.',
  },
  {
    title: 'Reusable systems over one-off screens',
    description: 'I prefer component libraries, shared patterns, and design consistency that help teams move faster over time.',
  },
];

const values = [
  { title: 'Clarity', description: 'Interfaces should lower cognitive load, communicate hierarchy, and make the next step obvious.' },
  { title: 'Craft', description: 'Responsive behavior, spacing, contrast, and interaction states matter because users notice quality immediately.' },
  { title: 'Ownership', description: 'I am comfortable carrying work from concept through shipped front-end implementation and iteration.' },
];

const team = [
  { title: 'Optum AI Team', description: 'Built custom UI for an AI chatbot, including agent-specific components and telemetry-aware interactions.' },
  { title: 'UX Infrastructure Team', description: 'Led front-end work across an internal AppStore, onboarding portal, and a broad catalog of forms used at enterprise scale.' },
  { title: 'Education', description: 'B.S. in Business Administration, Computer Information Systems, Appalachian State University.' },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Phil"
        title="A front-end engineer with deep experience in enterprise UX, accessibility, and UI systems."
        description="My background sits at the intersection of design and engineering: shaping interfaces, building reusable components, and making complex product workflows easier to navigate."
      />

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Approach</p>
            <h2>I focus on products that need both interaction quality and implementation rigor.</h2>
          </div>
          <div className="feature-list">
            {approach.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Working principles</p>
            <h2>The standards behind how I design and build front-end systems.</h2>
          </div>
          <div className="card-grid three-up">
            {values.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CaseStudiesSection />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Experience snapshot</p>
            <h2>The environments that shaped how I work.</h2>
          </div>
          <div className="card-grid three-up">
            {team.map((member) => (
              <article className="profile-card" key={member.title}>
                <h3>{member.title}</h3>
                <p>{member.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;