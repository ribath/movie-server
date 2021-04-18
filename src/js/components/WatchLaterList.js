import { connect } from 'react-redux';
import MovieDetails from './MovieDetails';

const mapStateToProps = (state) => (
  { list: state.watMovies });

function WatchList(props) {
  const watList = props.list;
  if (watList !== undefined && watList.length !== 0) {
    return (
      watList.map((movie) => (
        <MovieDetails
          showIcon={false}
          movieDetail={movie}
        />
      ))
    );
  } else {
    return (
      <div>
        No Movies Added
      </div>
    );
  }
}

const WatchLaterList = connect(mapStateToProps)(WatchList);

export default WatchLaterList;
