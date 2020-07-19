import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "../../components";
import auth from "../../utils/auth";
import { Multiselect } from "multiselect-react-dropdown";

const accountTypes = [
  {
    type: "Personal",
  },
  {
    type: "Company",
  },
  {
    type: "Doctor",
  },
];

const InitialValues = {
  username: "",
  password: "",
  accountType: 'Personal'
};

const SignUp = ({ setUser }) => {
  const [values, setValues] = useState(InitialValues);
  const [error, setError] = useState('');
  let history = useHistory();
  const handleInputChange = (value, attr) => {
    setValues((previous) => ({ ...previous, [attr]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await auth.createAccount(values);
    if (response.error) {
      return setError(response.error);
    }
    history.push('/login');
  };
  return (
    <Form.FormContainer>
      <Form.Form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <Form.Input
          type="text"
          placeholder="Username"
          value={values.username}
          onChange={(e) => handleInputChange(e.target.value, "username")}
          required
        ></Form.Input>
        <Form.Input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => handleInputChange(e.target.value, "password")}
          required
        ></Form.Input>
        <Form.Input
          placeholder="Account Type"
          as={Multiselect}
          options={accountTypes}
          displayValue="type"
          style={{
            searchBox: {
              background: "#fafafa",
              borderWidth: "0px",
              padding: "6px 16px",
            },
          }}
          onSelect={(list) => handleInputChange(list[0].type, "accountType")}
          onRemove={(list) => handleInputChange(list, "accountType")}
          singleSelect
          required
        />
        {values?.accountType === "Company" && (
          <>
            <Form.Input
              type="text"
              placeholder="Company Name"
              value={values.company}
              onChange={(e) => handleInputChange(e.target.value, "company")}
            ></Form.Input>
            <Form.Input
              type="text"
              placeholder="Company Logo URL"
              value={values.image}
              onChange={(e) => handleInputChange(e.target.value, 'image')}
            />
          </>
        )}
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        {error.length > 0 && <p style={{color: 'red'}}>{error}</p>}
        <Form.ButtonContainer>
          <Button type="submit">Sign Up</Button>
        </Form.ButtonContainer>
      </Form.Form>
    </Form.FormContainer>
  );
};

export default SignUp;
