import pricing from '../data/pricing.json';
import SectionHeading from './SectionHeading';

function PricingSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Core Strengths"
          title="The blend of product, accessibility, and implementation depth I bring to teams."
          description="This is the working mix behind the projects on this site: UI craft, systems thinking, and shipping discipline."
        />
        <div className="card-grid three-up">
          {pricing.map((plan) => (
            <article className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`} key={plan.name}>
              <p className="pricing-label">{plan.name}</p>
              <h3>{plan.tag}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;