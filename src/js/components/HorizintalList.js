/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useRef, useCallback } from 'react';
import { Image, Modal } from 'react-bootstrap';
import { makeStyles, GridList, GridListTile } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';
import { KEY, APIURL } from '../constants/api';
import MovieDetails from './MovieDetails';
import useMovieSearch from '../hooks/useMovieSearch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

const mapStateToProps = (state) => (
  { title: state.searchedTitle, year: state.searchedYear });

function List(props) {
  const propsData = props;
  let propTitle = propsData.title;
  let propYear = propsData.year;

  const [query, setQuery] = useState({});
  if (propsData.title === undefined
    || propsData.title === ''
    || propsData.title.length === 1) {
    propTitle = propsData.mock_title;
    propYear = propsData.mock_year;
  } else {
    propTitle = propsData.title;
    propYear = propsData.year;
  }

  if (query.s !== propTitle
    || query.y !== propYear) {
    setQuery(() => ({
      apikey: KEY,
      s: propTitle,
      y: propYear,
      page: 1
    }));
  }

  const [showMovieDetail, toggleShowMovieDetail] = useState(false);
  const [movieDetail, getMovieDetail] = useState({});

  const {
    movies,
    hasMore,
    loading,
    error
  } = useMovieSearch(query);

  const observer = useRef();
  const lastMovieElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // setPageNumber(prevPageNumber => prevPageNumber + 1)
        setQuery((prevQuery) => ({ ...prevQuery, page: prevQuery.page + 1 }));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const classes = useStyles();

  const getDetailData = (id) => {
    axios.get(APIURL, {
      params: {
        apikey: KEY,
        i: id
      }
    })
      .then((response) => {
        toggleShowMovieDetail(true);
        getMovieDetail(response.data);
      });
  };

  const detail_modal = (
    <Modal
    size="lg"
    show={showMovieDetail}
    onHide={() => toggleShowMovieDetail(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>{movieDetail.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MovieDetails
        showIcon
        movieDetail={movieDetail}
        />
      </Modal.Body>
    </Modal>
  );

  return (
    <div className={classes.root}>
      <GridList
      className={classes.gridList}
      >
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <GridListTile
          key={movie.imdbID}
          ref={lastMovieElementRef}
          className="poster-border"
          onClick={() => {
            getDetailData(movie.imdbID);
          }}
              >
                <Image
              className="poster-dimension"
              src={movie.Poster}
                rounded
                />
              </GridListTile>
            );
          } else {
            return (
              <GridListTile
          key={movie.imdbID}
          className="poster-border"
          onClick={() => {
            getDetailData(movie.imdbID);
          }}
              >
                <Image
              className="poster-dimension"
              src={movie.Poster}
                rounded
                />
              </GridListTile>
            );
          }
        })}
        <GridListTile
            className="last-poster-item"
        >
          <div className="last-poster-item">{loading && 'Loading...'}</div>
        </GridListTile>
        <GridListTile
            className="last-poster-item"
        >
          <div className="last-poster-item">{error && 'Error'}</div>
        </GridListTile>
      </GridList>

      {detail_modal}
    </div>
  );
}

const HorizontalList = connect(mapStateToProps)(List);

export default React.memo(HorizontalList);
