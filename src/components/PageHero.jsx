function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero compact-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default PageHero;