import sadFaceImage from '../assets/images/sad-face.svg';
import magikarpImage from '../assets/images/Magikarp.png';

function GamesNoticePage() {
  return (
    <section className="section games-notice-page">
      <div className="container games-notice-wrap">
        <img src={magikarpImage} alt="Sad face" className="games-notice-image" />
        <p className="games-notice-text">Sorry! The games only work on desktop currently.</p>
      </div>
    </section>
  );
}

export default GamesNoticePage;
