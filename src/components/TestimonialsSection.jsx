import testimonials from '../data/testimonials.json';
import SectionHeading from './SectionHeading';
import chikoritaImage from '../assets/images/Chikorita.png';

function TestimonialsSection() {
  return (
    <section className="section section-alt testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <img
            className="testimonials-image"
            src={chikoritaImage}
            alt=""
            aria-hidden="true"
          />
          <SectionHeading
            title="What others say about me."
            description="Yes, they're all real people. I promise!"
          />
        </div>
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