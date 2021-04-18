import { LOGIN_SUCCESS, SEARCH, ADD_TO_FAVOURITE, ADD_TO_WATCHLIST } from '../constants/action-types';

export function login() {
  return { type: LOGIN_SUCCESS };
}

export function search(payload) {
  return { type: SEARCH, payload };
}

export function addToFavourite(payload) {
  return { type: ADD_TO_FAVOURITE, payload };
}

export function addToWatchlist(payload) {
  return { type: ADD_TO_WATCHLIST, payload };
}
