import { Route } from 'react-router';
import FavMovieList from './FavMovieList';
import WatchLaterList from './WatchLaterList';

function WebRoute() {
  const favMovieList = () => (
    <FavMovieList />
  );
  const watMovieList = () => (
    <WatchLaterList />
  );

  return (
    <div>
      <Route path="/fav_list" component={favMovieList} />
      <Route path="/watch_list" component={watMovieList} />
    </div>
  );
}

export default WebRoute;
