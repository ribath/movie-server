/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';
import { search } from '../actions/index';
import HorizontalList from './HorizintalList';
import FavMovieList from './FavMovieList';
import WatchLaterList from './WatchLaterList';

function mapDispatchToProps(dispatch) {
  return {
    search: (query) => dispatch(search(query))
  };
}

class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      showHome: true,
      showFav: false,
      showWat: false
    };
  }

  componentDidMount() {
  }

  handleInputChange(event) {
    const data = this.state;
    this.setState({
      [event.target.id]: event.target.value,
      showHome: false,
      showFav: false,
      showWat: false
    });
    this.props.search({
      title: data.title,
      year: data.year
    });
  }

  body() {
    const data = this.state;
    if ((this.state.title === ''
    && this.state.showFav === false
    && this.state.showWat === false) && this.state.showHome) {
      this.props.search({
        title: data.title,
        year: data.year
      });
      return (
        <Landing />
      );
    } else if (this.state.title === ''
    && this.state.showFav === true
    && this.state.showWat === false
    && this.state.showHome === false) {
      this.props.search({
        title: data.title,
        year: data.year
      });
      return (
        <FavMovieList />
      );
    } else if (this.state.title === ''
    && this.state.showFav === false
    && this.state.showWat === true
    && this.state.showHome === false) {
      this.props.search({
        title: data.title,
        year: data.year
      });
      return (
        <WatchLaterList />
      );
    } else {
      return (
        <HorizontalList title={this.state.title} year={this.state.year} />
      );
    }
  }

  render() {
    const data = this.state;
    return (
      <div className="App page-border">
        <Navbar collapseOnSelect bg="light" variant="light">
          <Navbar.Brand
          href="#"
          className="brandname"
          >
            SHOWTIME
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
              href="#"
              onClick={() => {
                this.setState({ showHome: true, showFav: false, showWat: false, title: '', year: '' });
              }}
              >
                Home
              </Nav.Link>
              <Nav.Link
              href="#"
              onClick={() => {
                this.setState({ showHome: false, showFav: true, showWat: false, title: '', year: '' });
              }}
              >
                Favourites
              </Nav.Link>
              <Nav.Link
              href="#"
              onClick={() => {
                this.setState({ showHome: false, showFav: false, showWat: true, title: '', year: '' });
              }}
              >
                Watchlist
              </Nav.Link>
            </Nav>

            <Form inline>
              <FormControl
              id="title"
              size="sm"
              type="text"
              placeholder="Title"
              className="mr-sm-2"
              value={data.title}
              onChange={(event) => this.handleInputChange(event)}
              />
              <FormControl
              id="year"
              size="sm"
              type="number"
              placeholder="Year"
              className="mr-sm-2 date-own"
              value={data.year}
              onChange={(event) => this.handleInputChange(event)}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {this.body()}
        </BrowserRouter>
      </div>
    );
  }
}
const Home = connect(
  null,
  mapDispatchToProps
)(HomeComponent);

export default Home;
