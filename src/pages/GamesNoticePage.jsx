import sadFaceImage from '../assets/images/sad-face.svg';

function GamesNoticePage() {
  return (
    <section className="section games-notice-page">
      <div className="container games-notice-wrap">
        <img src={sadFaceImage} alt="Sad face" className="games-notice-image" />
        <p className="games-notice-text">Sorry! The games only work on desktop currently.</p>
      </div>
    </section>
  );
}

export default GamesNoticePage;
