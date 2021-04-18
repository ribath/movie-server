/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../constants/api';

function useMovieSearch(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let prev_query = {};
  // const [totalItems, setTotalItems] = useState(10);

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    // if (query.page <= totalItems / 10) {
    axios({
      method: 'GET',
      url: APIURL,
      params: query,
      cancelToken: new axios.CancelToken((c) => cancel = c)
    }).then((res) => {
      if (res.data.Response === 'True') {
        setMovies((prevMovies) => {
          // [...new Set([...prevMovies, ...res.data.Search.map((b) => b.title)])]
          if (res.data.Search !== undefined) {
            if ((prev_query.s !== query.s) || (prev_query.y !== query.y)) {
              // return [...movies, ...res.data.Search];
              return res.data.Search;
            } else {
              return [...movies, ...res.data.Search];
            }
          } else {
            return prevMovies;
          }
        });
        setHasMore(() => {
          if ([...movies, ...res.data.Search].length === res.data.totalResults) {
            return false;
          } else {
            return true;
          }
        });
        setLoading(false);
        // setTotalItems(res.data.totalResults);
      } else {
        setMovies(movies);
        setLoading(true);
        setError(false);
        setHasMore(false);
      }
    }).catch((e) => {
      if (axios.isCancel(e)) return;
      setError(true);
    });
    return () => cancel();
    // }
    // return 0;
  }, [query]);

  prev_query = query;

  return { loading, error, movies, hasMore };
}

export default useMovieSearch;
