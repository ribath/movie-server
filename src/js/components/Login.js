/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { USERNAME, PASSWORD } from '../constants/user';
import { login } from '../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(login())
  };
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username !== USERNAME) {
      alert('wrong username');
    } else if (this.state.password !== PASSWORD) {
      alert('wrong password');
    } else {
      this.props.login();
    }
  }

  render() {
    const { username } = this.state.username;
    const { password } = this.state.password;
    return (
      <Row>
        <Col md={4} />
        <Col md={4}>
          <Form onSubmit={(event) => this.handleSubmit(event)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="username"
                value={username}
                placeholder="Enter email"
                onChange={(event) => this.handleInputChange(event)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(event) => this.handleInputChange(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
        <Col md={4} />
      </Row>
    );
  }
}

const Login = connect(
  null,
  mapDispatchToProps
)(LoginComponent);

export default Login;
