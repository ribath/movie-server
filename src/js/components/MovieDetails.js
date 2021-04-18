import { Image, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { Favorite, WatchLater } from '@material-ui/icons';
import { addToFavourite, addToWatchlist } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    addToFavourite: (details) => dispatch(addToFavourite(details)),
    addToWatchlist: (details) => dispatch(addToWatchlist(details))
  };
}

function Details(props) {
  const data = props;

  const showIcons = (() => {
    if (data.showIcon) {
      return (
        <Row className="padding-left-10">
          <IconButton
            tooltip="Hide"
            style={{ float: 'right' }}
            onClick={() => { props.addToFavourite(data.movieDetail); }}
          >
            <Favorite />
          </IconButton>
          <IconButton
            tooltip="Hide"
            style={{ float: 'right' }}
            onClick={() => { props.addToWatchlist(data.movieDetail); }}
          >
            <WatchLater />
          </IconButton>
        </Row>
      );
    } else {
      return (<div />);
    }
  });
  return (
    <div>
      <Row className="movie_details_style">
        <Col md={4}>
          <Image
              className="poster-dimension"
              src={data.movieDetail.Poster}
                rounded
          />
          {showIcons()}
        </Col>
        <Col md={8}>
          <Row>
            <Col md={4}>Released</Col>
            <Col md={8}>{data.movieDetail.Released}</Col>
          </Row>
          <Row>
            <Col md={4}>Genre</Col>
            <Col md={8}>{data.movieDetail.Genre}</Col>
          </Row>
          <Row>
            <Col md={4}>Writer</Col>
            <Col md={8}>{data.movieDetail.Writer}</Col>
          </Row>
          <Row>
            <Col md={4}>Plot</Col>
            <Col md={8}>{data.movieDetail.Plot}</Col>
          </Row>
          <Row>
            <Col md={4}>Language</Col>
            <Col md={8}>{data.movieDetail.Language}</Col>
          </Row>
          <Row>
            <Col md={4}>imdbRating</Col>
            <Col md={8}>{data.movieDetail.imdbRating}</Col>
          </Row>
          <Row>
            <Col md={4}>Actors</Col>
            <Col md={8}>{data.movieDetail.Actors}</Col>
          </Row>
          <Row>
            <Col md={4}>Awards</Col>
            <Col md={8}>{data.movieDetail.Awards}</Col>
          </Row>
          <Row>
            <Col md={4}>Runtime</Col>
            <Col md={8}>{data.movieDetail.Runtime}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

const MovieDetails = connect(
  null,
  mapDispatchToProps
)(Details);

export default MovieDetails;
