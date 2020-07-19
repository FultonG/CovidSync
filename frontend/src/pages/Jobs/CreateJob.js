import React, { useState } from "react";
import { Form, Button } from "../../components";
import { Multiselect } from "multiselect-react-dropdown";
import languages from "../../utils/languages.json";
import cities from "../../utils/cities.json";
import jobs from "../../utils/jobs";
import {useHistory} from "react-router-dom";

const initialValues = {
  title: "",
  location: "",
  employmentType: "",
  length: "",
  languages: [],
};

const employmentTypes = [
  {
    type: "Full-Time",
  },
  {
    type: "Part-Time",
  },
  {
    type: "Temporary",
  },
  {
    type: "Seasonal",
  },
];

const CreateJobs = () => {
  const [values, setValues] = useState(initialValues);
  let history = useHistory();
  const handleInputChange = (value, attr) => {
    setValues((previous) => ({ ...previous, [attr]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await jobs.createPost(values);
    history.push('/jobs')

  };
  const preventSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Form.FormContainer>
      <Form.Form onSubmit={preventSubmit}>
        <h3>Create a new Job Post</h3>
        <Form.Input
          placeholder="Job Title"
          onChange={(e) => handleInputChange(e.target.value, "title")}
          required
        />
        <Form.Input
          as={Multiselect}
          options={cities}
          displayValue="city"
          style={{
            searchBox: {
              background: "#fafafa",
              borderWidth: "0px",
              padding: "6px 16px",
            },
          }}
          onSelect={(list) => handleInputChange(list[0].city, "location")}
          onRemove={(list) => handleInputChange(list[0].city, "location")}
          placeholder="Location"
          singleSelect
          required
        />
        <Form.Input
          placeholder="Employment Type"
          as={Multiselect}
          options={employmentTypes}
          displayValue="type"
          style={{
            searchBox: {
              background: "#fafafa",
              borderWidth: "0px",
              padding: "6px 16px",
            },
          }}
          onSelect={(list) => handleInputChange(list[0].type, "employmentType")}
          onRemove={(list) => handleInputChange(list[0].type, "employmentType")}
          singleSelect
          required
        />
        <Form.Input
          placeholder="Job Length"
          onChange={(e) => handleInputChange(e.target.value, "length")}
          required
        />
        <Form.Input
          as={Multiselect}
          options={languages}
          selectedValues={values.languages}
          onSelect={(list) => handleInputChange(list, "languages")}
          onRemove={(list) => handleInputChange(list, "languages")}
          style={{
            chips: { background: "#00dafc" },
            searchBox: {
              background: "#fafafa",
              borderWidth: "0px",
              padding: "6px 16px",
            },
          }}
          displayValue="name"
          placeholder="Required Languages"
          required
        />
        <Form.ButtonContainer>
          <Button type="button" onClick={handleSubmit}>Create Post</Button>
        </Form.ButtonContainer>
      </Form.Form>
    </Form.FormContainer>
  );
};

export default CreateJobs;
