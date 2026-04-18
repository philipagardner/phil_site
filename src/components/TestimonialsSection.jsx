import testimonials from '../data/testimonials.json';
import SectionHeading from './SectionHeading';

function TestimonialsSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Feedback"
          title="Representative stakeholder feedback from high-visibility internal product work."
          description="These quotes are written to reflect the kind of cross-functional feedback that follows strong UI ownership, accessible delivery, and reliable collaboration."
        />
        <div className="card-grid three-up">
          {testimonials.map((item) => (
            <article className="quote-card" key={item.name}>
              <p className="quote-text">"{item.quote}"</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;