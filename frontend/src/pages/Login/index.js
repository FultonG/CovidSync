import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from '../../components';
import auth from '../../utils/auth';

const InitialValues = {
  username: '',
  password: ''
}

const Login = ({setUser}) => {
  const [values, setValues] = useState(InitialValues);
  const handleInputChange = (value, attr) => {
    setValues(previous => ({...previous, [attr]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await auth.authenticateAccount(values);
    if(response.error){
      return console.log(response.error);
    }
    setUser({...response, isLoggedIn: true});
  }
  return(
    <Form.FormContainer>
    <Form.Form onSubmit={handleSubmit}>
      <h3>Log In</h3>
      <Form.Input type="text" placeholder="Username" value={values.username} onChange={(e) => handleInputChange(e.target.value, 'username')} required></Form.Input>
      <Form.Input type="password" placeholder="Password" value={values.password} onChange={(e) => handleInputChange(e.target.value, 'password')} required></Form.Input>
      <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      <Form.ButtonContainer><Button type="submit">Log in</Button></Form.ButtonContainer>
    </Form.Form>
  </Form.FormContainer>
  )
}

export default Login;