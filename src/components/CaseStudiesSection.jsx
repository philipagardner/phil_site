import caseStudies from '../data/case-studies.json';
import SectionHeading from './SectionHeading';

function CaseStudiesSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Project Stories"
          title="Work shaped around messy enterprise workflows, accessibility, and adoption at scale."
          description="Each story is based on resume-backed initiatives, with details expanded to communicate scope, complexity, and business value."
        />
        <div className="card-grid three-up">
          {caseStudies.map((item) => (
            <article className="case-study-card" key={item.title}>
              <p className="case-study-industry">{item.industry}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <dl>
                <div>
                  <dt>Challenge</dt>
                  <dd>{item.challenge}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>{item.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;