import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import jobs from "../../utils/jobs";
import styled from "styled-components";
import { Button } from "../../components";

const Card = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  padding: 2%;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.06);
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  margin-top: 20px;

  @media only screen and (max-width: 576px) {
    justify-content: center;
    align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.div`
  display: flex;
  ${({ justify = "center" }) => `justify-content: ${justify};`}
  align-items: center;
  ${({ direction = "row" }) => `flex-direction: ${direction};`}
  ${({ margin = "0px" }) => `margin: ${margin};`}
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  margin: 0px 10px;
`;

const Title = styled.h1`
  display: inline;
`;

const LanguageChip = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  background-color: #00dafc;
  border-radius: 30px 30px 30px 30px;
  min-height: 25px;
  min-width: 75px;
  margin: 2px;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ApplyPage = ({ user }) => {
  let {
    params: { id },
  } = useRouteMatch("/jobs/:id");
  let history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [job, setJob] = useState(null);
  const fetchJob = async (id) => {
    const data = await jobs.getJob(id);
    setJob(data);
  };

  useEffect(() => {
    fetchJob(id);
  }, [id]);

  const handleApply = async () => {
    setSuccess("");
    setError('');
    let userCopy = Object.assign({}, user);
    delete userCopy.token;
    delete userCopy.isLoggedIn;
    const response = await jobs.apply({id, user: userCopy})
    if(response.error){
      return setError('You have already applied to this position');
    }
    setSuccess("You have successfully applied to this position!");
  }

  return (
    <Container>
      <Card>
        <FlexContainer>
          <Image src={job?.image}></Image>
          <Title>{job?.title}</Title>
        </FlexContainer>

        <h5>{job?.description}</h5>

        <FlexContainer direction="column">
          <h5>Job information</h5>
          <p>Company: {job?.company}</p>
          <p>Location: {job?.location}</p>
          <p>Employment Type: {job?.employmentType}</p>
          <p>Length: {job?.length}</p>
          <p>Required Languages:</p>
          <LanguageContainer>
            {job?.languages.map((lang) => (
              <LanguageChip>{lang.name}</LanguageChip>
            ))}
          </LanguageContainer>
          {user.isLoggedIn && user.accountType === "Personal" && (
            <FlexContainer margin="20px 0px" direction="column">
              <Button onClick={handleApply}>Easy Apply</Button>
              {error.length > 0 && <p style={{color: 'red'}}>{error}</p>}
              {success.length > 0 && <p style={{color: 'green'}}>{success}</p>}
            </FlexContainer>
          )}

          {!user.isLoggedIn && (
            <FlexContainer margin="20px 0px">
              <Button onClick={() => history.push('/login')}>Log In</Button>
            </FlexContainer>
          )}
        </FlexContainer>
      </Card>
    </Container>
  );
};

export default ApplyPage;
