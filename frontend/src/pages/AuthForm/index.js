import React from 'react';
import FormTemplate from './FormTemplate';
import auth from '../../utils/auth';

const AuthForm = ({type, setUser}) => {
  const forms = {
    signup: {
      label: 'Create Your Account',
      button: 'Create',
      formSubmit: async (values) => {
        let response = await auth.createAccount(values);
        console.log(response);
      },
      message: 'Already have an account? Log in',
      link: 'login'
    },
    login: {
      label: 'Login',
      button: 'Login',
      formSubmit: async (values) => {
        let response = await auth.authenticateAccount(values);
        if(response.error){
          return console.log(response.error);
        }
        setUser({...response, isLoggedIn: true});
      },
      message: 'Don\'t have an account? Sign up',
      link: 'signup'
    }
  }

  return <FormTemplate {...forms[type]}/>
}



export default AuthForm;