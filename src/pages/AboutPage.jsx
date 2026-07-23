import PageHero from '../components/PageHero';
import CaseStudiesSection from '../components/CaseStudiesSection';
import philAndSamara from '../assets/images/phil-and-samara.jpg';
import ruffRidge from '../assets/images/ruff-ridge-1.jpg';
import myReflection from '../assets/images/my-reflection.jpg';

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
  { title: 'Clarity', description: 'Interfaces should do what is expected.' },
  { title: 'Functionality', description: 'Responsive behavior, spacing, contrast-- a bad interaction will immediately make someone not trust the company.' },
  { title: 'Responsiveness', description: 'It\'s 2026, every company site should work perfectly on mobile devices.' },
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
        <div className="container">
          <div className="about-photos">
            <img src={philAndSamara} alt="Phil and Samara" className="about-photo" />
            <img src={ruffRidge} alt="Ruff Ridge" className="about-photo" />
            <img src={myReflection} alt="My Reflection" className="about-photo" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <p className="eyebrow">Approach</p>
            <h2>Honestly, I think things should just be simple.</h2>
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
            <h2>Here's my opinion.</h2>
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
            <p className="eyebrow">My Muses</p>
            <h2>What keeps me going</h2>
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