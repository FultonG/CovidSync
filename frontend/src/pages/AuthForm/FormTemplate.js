import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Form, Button} from '../../components';

const InitialValues = {
  username: '',
  password: ''
}
const FormTemplate = ({label, button, formSubmit, message, link}) => {
  const [values, setValues] = useState(InitialValues);
  const handleInputChange = (value, attr) => {
    setValues(previous => ({...previous, [attr]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit(values);
  }
  return (
    <Form.FormContainer>
      <Form.Form onSubmit={handleSubmit}>
        <h3>{label}</h3>
        <Form.Input type="text" placeholder="Username" value={values.username} onChange={(e) => handleInputChange(e.target.value, 'username')} required></Form.Input>
        <Form.Input type="password" placeholder="Password" value={values.password} onChange={(e) => handleInputChange(e.target.value, 'password')} required></Form.Input>
        <Link to={link}>{message}</Link>
        <Form.ButtonContainer><Button type="submit">{button}</Button></Form.ButtonContainer>
      </Form.Form>
    </Form.FormContainer>
  )
};

export default FormTemplate;