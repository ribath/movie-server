import { Image } from 'react-bootstrap';
import HorizontalList from './HorizintalList';

function Landing() {
  return (
    <div>
      <br />
      <Image
              className="home-poster-dimension"
              src="../../../stranger-things-3-poster-horizontal-by-kyle-lambert.jpg"
                rounded
      />
      <br />
      <br />
      <br />
      <br />
      <div className="row-header"> Batman Movies </div>
      <br />
      <HorizontalList mock_title="Batman" mock_year="" />
      <br />
      <br />
      <div className="row-header"> Asian Movies </div>
      <br />
      <HorizontalList mock_title="Asian" mock_year="" />
    </div>
  );
}

export default Landing;
