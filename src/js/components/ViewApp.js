import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';

const mapStateToProps = (state) => ({ loggedIn: state.loggedIn });

const LoginCheck = ({ loggedIn }) => {
  if (loggedIn) {
    return (
      <Home />
    );
  } else {
    return (
      <Login />
    );
  }
};

const ViewApp = connect(mapStateToProps)(LoginCheck);

export default ViewApp;
