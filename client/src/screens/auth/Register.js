import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { TextInput, Button, Row, Icon, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { registerUser } from '../../store/actions/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });
  const { firstName, lastName, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!firstName) {
      M.toast({ html: 'Please enter name' });
    } else if (!lastName) {
      M.toast({ html: 'Please enter surname' });
    } else if (!email) {
      M.toast({ html: 'Please enter email' });
    } else if (!password || !password2) {
      M.toast({ html: 'Please enter password' });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match' });
    } else {
      dispatch(registerUser({ firstName, lastName, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Container className="center mt auth-container">
      <Row>
        <form onSubmit={onSubmitHandler}>
          <TextInput
            id="register-name"
            label="Name"
            name="firstName"
            value={firstName}
            onChange={onChangeHandler}
            s={12}
            m={6}
          />
          <TextInput
            id="register-surname"
            label="Surname"
            name="lastName"
            value={lastName}
            onChange={onChangeHandler}
            s={12}
            m={6}
          />
          <TextInput
            id="register-email"
            email
            label="Email"
            name="email"
            value={email}
            onChange={onChangeHandler}
            s={12}
            m={12}
          />
          <TextInput
            id="register-password"
            password
            label="Password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            s={12}
            m={6}
          />
          <TextInput
            id="register-password2"
            password
            label="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChangeHandler}
            s={12}
            m={6}
          />
          <Row s={12} m={12}>
            <Button className="blue darken-2" type="submit" variant="contained" value="Register">
              Register
              <Icon right>add</Icon>
            </Button>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </Row>
        </form>
      </Row>
    </Container>
  );
};

export default Register;
