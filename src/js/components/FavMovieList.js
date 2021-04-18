import { connect } from 'react-redux';
import MovieDetails from './MovieDetails';

const mapStateToProps = (state) => (
  { list: state.favMovies });

function FavList(props) {
  const favList = props.list;
  if (favList !== undefined && favList.length !== 0) {
    return (
      favList.map((movie) => (
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

const FavMovieList = connect(mapStateToProps)(FavList);

export default FavMovieList;
