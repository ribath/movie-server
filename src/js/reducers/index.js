/* eslint-disable max-len */
import { LOGIN_SUCCESS, LOGIN_FAILED, SEARCH, ADD_TO_FAVOURITE, ADD_TO_WATCHLIST } from '../constants/action-types';

const initialState = {
  loggedIn: false,
  searchedTitle: '',
  searchedYear: '',
  watMovies: [],
  favMovies: []
};

function uniq(a, param) {
  return a.filter((item, pos, array) => array.map((mapItem) => mapItem[param]).indexOf(item[param]) === pos);
}

function rootReducer(state = initialState, action) {
  if (action.type === LOGIN_SUCCESS) {
    return { ...state, loggedIn: true };
  } if (action.type === LOGIN_FAILED) {
    return { ...state, loggedIn: false };
  } if (action.type === SEARCH) {
    return { ...state, searchedTitle: action.payload.title, searchedYear: action.payload.year };
  } if (action.type === ADD_TO_FAVOURITE) {
    if (state.favMovies === undefined) {
      return { ...state, favMovies: [action.payload] };
    } else {
      return { ...state, favMovies: uniq([...state.favMovies, action.payload], 'imdbID') };
    }
  } if (action.type === ADD_TO_WATCHLIST) {
    if (state.watMovies === undefined) {
      return { ...state, watMovies: [action.payload] };
    } else {
      return { ...state, watMovies: uniq([...state.watMovies, action.payload], 'imdbID') };
    }
  }
  return state;
}
export default rootReducer;
