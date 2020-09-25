import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput, Button, Icon, Col, Row } from 'react-materialize';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Row style={rowStyle}>
      <form onSubmit={onSubmit}>
        <Row>
          <Col>
            <TextInput
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              type="submit"
              value="Login"
              variant="contained"
              color="primary"
              className="float-right"
            >
              Login
              <Icon right>login</Icon>
            </Button>
          </Col>
        </Row>
      </form>
    </Row>
  );
};

const rowStyle = {
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px'
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
